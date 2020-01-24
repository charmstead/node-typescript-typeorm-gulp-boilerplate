
import { Entity, Column,JoinColumn,OneToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { IsNotEmpty } from "class-validator";
import Account  from "./Account";

@Entity()
export default class RefreshToken extends BaseModel {

    @Column('varchar')
    token: string;

    @IsNotEmpty()
    @OneToOne(() => Account)
    @JoinColumn({name:'account_id'})
    account:Account;

    @Column('datetime')
    expires: Date
}