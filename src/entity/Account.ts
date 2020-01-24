import { Entity,OneToOne,JoinColumn, Column, Unique } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Length, IsEmail,IsNotEmpty,IsBoolean } from "class-validator";
import * as bcrypt from "bcryptjs";
import  User  from "./User";

export enum UserRole {
    ADMIN = "admin",
    SUPERADMIN = "superadmin",
    USER = "user",
}
 
@Entity()
@Unique(["email"])
export default class Account extends BaseModel {

    @Column()
    @IsEmail()
    email: string;

    @Column({select: false})
    @Length(4, 200)
    @IsNotEmpty()
    password: string;

    @Column({default:true})
    @IsBoolean()
    active: boolean;
    // @Column("text",{array:true})
    // @IsArray()
    // roles: string[];  

    @Column({
        type: "set",
        enum: UserRole,
        default: [UserRole.USER]
    })
    roles: UserRole[]

    @OneToOne(type => User,user=>user.account)
    @JoinColumn()
    user:User;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
        return this;
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
