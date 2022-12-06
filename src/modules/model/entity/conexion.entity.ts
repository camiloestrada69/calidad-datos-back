import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FUENTES } from "../../../utils/enums/fuentes";
import { AMBIENTES } from "../../../utils/enums/ambientes";
import { AutoMap } from "@automapper/classes";

@Entity('conexiones')
export class ConexionEntity extends BaseEntity{

  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  @AutoMap()
  id: number;

  @Column({ name: 'id_usuario', type: 'int' })
  @AutoMap()
  idUsuario: number;

  @Column({ length: 50, name: 'nombre', type: 'varchar', nullable: false })
  @AutoMap()
  nombre: string;

  @Column({ name: 'url', type: 'varchar', nullable: false })
  @AutoMap()
  url: string;

  @Column({ name: 'usuario', type: 'varchar', nullable: false })
  @AutoMap()
  usuario: string;

  @Column({ name: 'contraseña', type: 'varchar', nullable: false })
  @AutoMap()
  contrasena: string;


  @Column({
    name: 'fuente',
    default: FUENTES.AZURE_DATA_LAKE,
    type: 'varchar',
    nullable: false
  })
  @AutoMap()
  fuente: FUENTES;

  @Column({
    name: 'ambiente',
    default: AMBIENTES.PRUEBAS,
    type: 'varchar',
    nullable: false
  })
  @AutoMap()
  ambiente: AMBIENTES;

}
