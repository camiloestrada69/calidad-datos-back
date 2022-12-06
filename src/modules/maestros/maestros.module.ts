import { Module, HttpServer } from "@nestjs/common";
import { ConexionController } from "./controller/conexion/conexion.controller";
import { ConexionFacadeService } from "./facade/conexion/conexion.facade.service";
import { ConexionService } from "./service/conexion/conexion.service";
import { ConexionMapper } from "./mapper/conexion.mapper";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConexionRepository } from "./repository/conexion.repository";
import { ConexionEntity } from "../model/entity/conexion.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
          ConexionEntity,
        ]),
    ],
    controllers: [ConexionController],
    providers: [ConexionFacadeService, ConexionService, ConexionMapper, ConexionRepository],
})
export class MaestrosModule {}

