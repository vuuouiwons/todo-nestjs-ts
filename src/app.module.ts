import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { EmailModule } from './email/email.module';
import basicAuth from 'express-basic-auth';
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('redis.port'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('redis.bullmq_db'),
        },
      }),
    }),
    BullBoardModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        route: '/admin/queues',
        adapter: ExpressAdapter,
        middleware: basicAuth({
          challenge: true,
          users: {
            admin: configService.get<string>(
              'BULLMQ_ADMIN_PASSWORD',
              'password',
            ),
          },
        }),
      }),
    }),
    UserModule,
    AuthModule,
    TodolistModule,
    TodoModule,
    HealthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
