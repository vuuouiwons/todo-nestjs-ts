import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../../user/entities/user.entity"
import { Todo } from "../../todo/entities/todo.entity"

@Entity()
export class Todolist {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 24 })
    title!: string

    @Column({ type: "boolean", default: () => "false" })
    status!: boolean

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date

    @ManyToOne(type => User, user => user.todolist)
    user!: User

    @OneToMany(type => Todo, todo => todo.todolist)
    todo!: Todo[]
}