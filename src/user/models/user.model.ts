import { Table, Column, Model, DataType, Unique, HasMany } from "sequelize-typescript";
import { Todolist } from "src/todolist/models/todolist.model";

@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
})
export class User extends Model {
    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @HasMany(() => Todolist)
    declare todolist: Todolist[];
}
