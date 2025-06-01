import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';
import { TasksService } from './tasks.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [ScheduleModule.forRoot(), MoviesModule, UsersModule, EmailModule],
  providers: [TasksService],
})
export class TasksModule {}
