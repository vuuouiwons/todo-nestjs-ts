import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Todo } from "../../todo/models/todo.model";

@Table({
    tableName: 'todolists',
    timestamps: true,
    paranoid: true,
})
@Table({
    tableName: 'todolists',
    paranoid: true,
    timestamps: true
})
export class Todolist extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare text: string;

    @HasMany(() => Todo)
    declare todos: Todo[];
}
