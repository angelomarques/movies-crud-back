import { Module } from '@nestjs/common';
import { BaseRepositoryCoreModule } from 'src/base-repository/base-repository.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [BaseRepositoryCoreModule.forFeature(User)],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
