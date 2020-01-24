import {PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,BaseEntity} from "typeorm";
import * as crypto from 'crypto';


export abstract class BaseModel extends BaseEntity {

  // @PrimaryColumn('varchar', { length:16,unique:true, default: () => getRandomID(16)})
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  getId() {
    return this.id;
  }
}

const getRandomID=(num)=>crypto.randomBytes(num).toString('hex')