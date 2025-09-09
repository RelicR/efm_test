import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Length, IsEmail, IsDate } from "class-validator"
import { UserRole } from "../model/User"

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         middle_name:
 *           type: string
 *         birthday:
 *           type: Date
 *         status:
 *           type: boolean
 *         version:
 *           type: number
 *         role:
 *           type: string
 *       required:
 *         - email
 *         - password
 */
@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    // @Column({
    //     type: "varchar",
    //     length: 25,
    // })
    // @Length(5, 25)
    // username: string

    @Column({
        type: "citext",
        unique: true,
    })
    @IsEmail()
    email: string

    @Column({
        type: "varchar",
        length: 255,
    })
    @Length(6)
    password: string

    @Column({
        type: "varchar",
        length: 50,
    })
    first_name: string

    @Column({
        type: "varchar",
        length: 50,
    })
    last_name: string

    @Column({
        type: "varchar",
        length: 50,
        nullable: true,
    })
    middle_name?: string

    @Column({
        type: "date",
    })
    @IsDate()
    birthday: Date

    @Column({
        type: "varchar",
        length: 10,
        enum: UserRole,
        default: "User",
        nullable: true,
    })
    role?: UserRole

    @Column({
        default: true,
        nullable: true,
    })
    status?: boolean

    @Column({
        type: "smallint",
        default: 1,
        nullable: true,
    })
    version?: number
}