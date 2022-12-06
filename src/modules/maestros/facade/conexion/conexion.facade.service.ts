import { Injectable } from "@nestjs/common";
import { ConexionService } from "../../service/conexion/conexion.service";
import { ConexionEntity } from "../../../model/entity/conexion.entity";
import { ConexionDTO } from "../../../model/dto/conexionDTO";
import { ConexionMapper } from "../../mapper/conexion.mapper";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class ConexionFacadeService {
  conexionService: ConexionService;
  conexionMapper: ConexionMapper;
  constructor(conexionService: ConexionService, conexionMapper: ConexionMapper, @InjectMapper() private readonly classMapper: Mapper) {
    this.conexionService = conexionService;
    this.conexionMapper = conexionMapper;
  }

  public async listarConexiones():Promise<ConexionDTO[]>{
    const conexiones = await this.conexionService.listarConexiones();
    return  this.classMapper.mapArray(conexiones, ConexionEntity, ConexionDTO);
  }

  public async crearConexion(conexion: ConexionDTO): Promise<ConexionDTO> {
    console.log()
    const conexionEntity = this.classMapper.map(conexion, ConexionDTO, ConexionEntity);
    const conexionCreada = await this.conexionService.crearConexion(conexionEntity)
    return this.classMapper.map(conexionCreada, ConexionEntity, ConexionDTO);
  }

  public async actualizarConexion(conexion: ConexionDTO): Promise<ConexionDTO> {
    const conexionEntity = this.classMapper.map(conexion, ConexionDTO, ConexionEntity);
    const conexionCreada = await this.conexionService.actualizarConexion(conexionEntity)
    return this.classMapper.map(conexionCreada, ConexionEntity, ConexionDTO);
  }

  public async consultarConexionPorId(id: number): Promise<ConexionDTO> {
    const conexionCOnsultada = await this.conexionService.consultarConexionPorId(id)
    return this.classMapper.map(conexionCOnsultada, ConexionEntity, ConexionDTO);
  }

  public async transacional(conexion: ConexionDTO): Promise<ConexionDTO> {
    const conexionEntity = this.classMapper.map(conexion, ConexionDTO, ConexionEntity);
    const conexionCreada = await this.conexionService.actualizarTranc(conexionEntity)
    return this.classMapper.map(conexionCreada, ConexionEntity, ConexionDTO);
  }



  async consultarConexionesPaginadasPorIdUsuario(options: IPaginationOptions, idUsuario: number, nombre: string, ambiente: string): Promise<Pagination<ConexionDTO>> {
    const datos = await this.conexionService.consultarConexionesPaginadasPorIdUsuario(options, idUsuario, nombre, ambiente);
    return new Pagination(this.classMapper.mapArray(datos.items, ConexionEntity, ConexionDTO), datos.meta, null);
  }

  async eliminarConexion(id: number): Promise<any> {
    return await this.conexionService.eliminarConexion(id);
  }

}
