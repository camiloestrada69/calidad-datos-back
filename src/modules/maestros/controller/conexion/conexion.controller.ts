import {
  Body,
  Controller,
  DefaultValuePipe, Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { StandardResponse } from "../../../../utils/http-response/standard-response";
import { ConexionFacadeService } from "../../facade/conexion/conexion.facade.service";
import { PAGINACION_LIMIT_DEFAULT, PAGINACION_PAGE_DEFAULT, TAG_CONEXION } from "../../../../utils/constants";
import { ApiTags } from "@nestjs/swagger";
import { ConexionDTO } from "../../../model/dto/conexionDTO";
import { Pagination } from "nestjs-typeorm-paginate";

@ApiTags(TAG_CONEXION)
@Controller('api/conexiones')
export class ConexionController {
  conexionFacade: ConexionFacadeService
  constructor(conexionFacade: ConexionFacadeService) {
    this.conexionFacade = conexionFacade;
  }

  @Get()
  public async listarConexiones(): Promise<StandardResponse<any[]>> {
    return {
      status: HttpStatus.OK,
      body: await this.conexionFacade.listarConexiones(),
      message: 'Consulta exitosa'
    };
  }

  @Post()
  public async crearConexion(@Body() conexion: ConexionDTO): Promise<StandardResponse<ConexionDTO>> {
    return {
      status: HttpStatus.CREATED,
      body: await this.conexionFacade.crearConexion(conexion),
      message: 'Creación exitosa'
    };
  }

  @Put()
  public async actualizarConexion(@Body() conexion: ConexionDTO): Promise<StandardResponse<ConexionDTO>> {
    return {
      status: HttpStatus.CREATED,
      body: await this.conexionFacade.actualizarConexion(conexion),
      message: 'Actualización exitosa'
    };
  }

  @Get('/:id')
  public async consultarConexionPorId(@Param('id') id: number): Promise<StandardResponse<ConexionDTO>> {
    return {
      status: HttpStatus.OK,
      body: await this.conexionFacade.consultarConexionPorId(id),
      message: 'Consulta exitosa'
    }
  }

  @Put('tranc')
  public async actualizarConexionTrac(@Body() conexion: ConexionDTO): Promise<StandardResponse<ConexionDTO>> {
    return {
      status: HttpStatus.OK,
      body: await this.conexionFacade.transacional(conexion),
      message: 'Creación exitosa'
    };
  }



  @Get('paginadas/:idUsuario')
  public async consultarConexionesPaginadasPorIdUsuario(
    @Param('idUsuario') idUsuario: number,
    @Query('page', new DefaultValuePipe(PAGINACION_PAGE_DEFAULT), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(PAGINACION_LIMIT_DEFAULT), ParseIntPipe) limit: number,
    @Query('nombre') nombre: string = '',
    @Query('ambiente') ambiente: string = '',
  ): Promise<StandardResponse<Pagination<ConexionDTO>>> {
    return {
      status: HttpStatus.OK,
      body: await this.conexionFacade.consultarConexionesPaginadasPorIdUsuario({page, limit}, idUsuario, nombre, ambiente),
      message: 'Consulta exitosa'
    };
  }

  @Delete('/:id')
  public async eliminarConexion(@Param('id') id: number): Promise<StandardResponse<any>> {
    return {
      status: HttpStatus.ACCEPTED,
      body: await this.conexionFacade.eliminarConexion(id),
      message: 'Eliminación exitosa'
    };
  }


}
