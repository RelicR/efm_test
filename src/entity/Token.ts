import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import { User } from "./User";

@Entity()
export class Token {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true })
    user_id: string

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({
        type: "varchar",
        length: 255,
    })
    token: string

    @Column({
        type: "bigint",
    })
    expires_in: number

    @Column({
        type: "varchar",
        length: 255,
    })
    fingerprint: string
}