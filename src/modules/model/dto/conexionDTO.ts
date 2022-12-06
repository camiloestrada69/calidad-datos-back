import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { FUENTES } from "../../../utils/enums/fuentes";
import { AMBIENTES } from "../../../utils/enums/ambientes";
import { IsNotEmpty, MaxLength } from "class-validator";

export class ConexionDTO{

  @AutoMap()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  @AutoMap()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  idUsuario: number;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  contrasena: string;


  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  fuente: FUENTES;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  ambiente: AMBIENTES;
}
