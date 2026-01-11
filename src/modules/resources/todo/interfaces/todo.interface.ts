import { Todolist } from "../../todolist/entities/todolist.entity";

export interface TodoI {
    todolist: Todolist;
    message: string;
    status: boolean;
}

