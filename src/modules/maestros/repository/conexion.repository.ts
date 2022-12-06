import { ConexionEntity } from "../../model/entity/conexion.entity";
import { Brackets, EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Injectable } from "@nestjs/common";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
@EntityRepository(ConexionEntity)
export class ConexionRepository extends BaseRepository<ConexionEntity> {

  public async consultarConexionesPaginadasPorIdUsuario(
    options: IPaginationOptions,
    idUsuario: number, nombre: string, ambiente: string): Promise<Pagination<ConexionEntity>> {
    const queryBuilder = this.createQueryBuilder("c")
      .where("c.idUsuario =:idUsuario", { idUsuario: idUsuario })
      .andWhere(new Brackets(qb => {
        qb.where(nombre == '' ? "TRUE" : 'UPPER(c.nombre) lIKE UPPER(:nombre)', { nombre: `%${nombre}%` })
      }))
      .andWhere(new Brackets(qb => {
        qb.where(ambiente == '' ? "TRUE" : 'UPPER(c.ambiente) LIKE UPPER(:ambiente)', { ambiente: `%${ambiente}%` })
      }))
    return paginate<ConexionEntity>(queryBuilder, options);
  }
}
