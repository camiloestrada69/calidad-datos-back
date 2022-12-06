import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {HttpExceptionFilter} from "./exception/filters/htt.exception.filter";
import {ConfigService} from "@nestjs/config";
import {NestFactory} from "@nestjs/core";
import { API_DOC, HTTP, PORT, SECURITY_BASIC, TAG_CONEXION, TITLE_SWAGGER, VERSION_SWAGGER } from "./utils/constants";
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
      .setTitle(TITLE_SWAGGER)
      .setVersion(VERSION_SWAGGER)
      .addSecurity(SECURITY_BASIC, {
        type: HTTP,
        scheme: SECURITY_BASIC,
      })
      .addTag(TAG_CONEXION)
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_DOC, app, document, {
      explorer: true,
      swaggerOptions: {
          filter: true,
          showRequestDuration: true,
      }
  });

  app.useGlobalFilters(
      new HttpExceptionFilter(),
  );

  initializeTransactionalContext();

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get(PORT));

}
bootstrap();
