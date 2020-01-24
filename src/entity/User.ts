import {Entity, Column,OneToOne,JoinColumn} from "typeorm";
import { BaseModel } from "./BaseModel";
import { IsInt,IsNotEmpty } from "class-validator";
import  Account from "./Account";
 


@Entity()
export default class User extends BaseModel {

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    middleName: string;

    @Column()
    @IsInt()
    age: number;

    @OneToOne(type => Account,account=>account.user,{nullable:false})
    @IsNotEmpty()
    @JoinColumn({name:'account_id'})
    account:Account;

}