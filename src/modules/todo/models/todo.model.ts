import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Todolist } from '../../todolist/models/todolist.model';

@Table({
    tableName: 'todos',
    timestamps: true,
    paranoid: true,
})
export class Todo extends Model {
    @ForeignKey(() => Todolist)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare todolistId: number;

    @BelongsTo(() => Todolist)
    declare todolist: Todolist;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare text: string;
}