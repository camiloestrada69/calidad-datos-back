import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper } from "@automapper/core";
import { ConexionEntity } from "../../model/entity/conexion.entity";
import { ConexionDTO } from "../../model/dto/conexionDTO";

@Injectable()
export class ConexionMapper extends AutomapperProfile{


  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ConexionEntity, ConexionDTO);
      createMap(mapper, ConexionDTO, ConexionEntity);
    };
  }
}
