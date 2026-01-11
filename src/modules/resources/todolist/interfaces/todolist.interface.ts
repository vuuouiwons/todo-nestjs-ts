import { User } from "src/modules/resources/user/entities/user.entity";

export interface TodolistI {
    title: string;
    status: boolean,
    user: User
}