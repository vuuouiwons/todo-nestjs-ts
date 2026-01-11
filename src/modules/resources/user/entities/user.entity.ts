import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Todolist } from "../../todolist/entities/todolist.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @ApiProperty({ example: 'foo_bar', description: 'username' })
    @Column({ length: 24 })
    username!: string

    @Column("text", { unique: true })
    email!: string

    @Column("text")
    password!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date

    @OneToMany(type => Todolist, todolist => todolist.user)
    todolist!: Todolist[]
}