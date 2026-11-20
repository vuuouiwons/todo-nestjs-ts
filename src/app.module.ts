import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { User } from './user/entities/user.entity';
import { Todolist } from './todolist/entities/todolist.entity';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.staging'],
      ignoreEnvFile: process.env.ENVIRONMENT === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('database.postgresql.port'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('database.postgresql.db'),
        entities: [User, Todolist, Todo],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    TodolistModule,
    TodoModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
