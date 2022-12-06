import {Logger, Module} from '@nestjs/common';
import {MaestrosModule} from "./modules/maestros/maestros.module";
import {MongooseModule} from "@nestjs/mongoose";
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import {APP_FILTER} from "@nestjs/core";
import {HttpExceptionFilter} from "./exception/filters/htt.exception.filter";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config/configuration";
import {validationSchema} from "../config/validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConexionEntity } from "./modules/model/entity/conexion.entity";
import { ConexionRepository } from "./modules/maestros/repository/conexion.repository";

@Module({
  imports: [
    MaestrosModule,
    AutomapperModule.forRoot({strategyInitializer: classes()}),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`,
      load: [configuration],
      validationSchema,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.dbname,
      entities: [
        ConexionEntity,
      ],
      synchronize: true,
      ssl: {
        ca: process.env.SSL_CERT,
      }// Si quieres sincronizar las entidades con la bd,
      //(esto crea las tablas si no existen)
    }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    Logger
  ]
})
export class AppModule {}
