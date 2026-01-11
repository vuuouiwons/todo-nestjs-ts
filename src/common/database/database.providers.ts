import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';

import { Todo } from '../../modules/resources/todo/entities/todo.entity';
import { Todolist } from '../../modules/resources/todolist/entities/todolist.entity';
import { User } from '../../modules/resources/user/entities/user.entity';


const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Todolist,
          Todo
        ],
        synchronize: true ? process.env.ENVIRONMENT === 'dev' || process.env.TEST_PROD == 'yes' : false,
      });

      return dataSource.initialize();
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
