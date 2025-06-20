import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { MoviesModule } from './movies/movies.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.TYPEORM_URL,
      entities: [`${__dirname}/**/entities/*.{ts,js}`],
      migrations: [`${__dirname}/**/migration/*.{ts,js}`],
      logging: false,
      synchronize: false,
      migrationsRun: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    FilesModule,
    EmailModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
