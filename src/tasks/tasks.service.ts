import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly movieService: MoviesService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM, {
    name: 'dailyReleaseNotifications',
  })
  async handleDailyReleaseNotifications() {
    const moviesReleasingToday = await this.movieService.findReleasingToday();

    if (moviesReleasingToday.length === 0) {
      return;
    }

    const users = await this.userService.findAll();

    if (users.length === 0) {
      return;
    }

    for (const user of users) {
      try {
        await this.emailService.sendNewReleasesEmail(
          user,
          moviesReleasingToday,
        );
      } catch (_error) {
        return;
      }
    }
  }

  // TODO: comment it
  //   @Cron(CronExpression.EVERY_30_SECONDS)
  //   async testCron() {
  //     console.log('Test cron running every 30 seconds');

  //     await this.handleDailyReleaseNotifications();
  //   }
}
