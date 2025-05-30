import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-repository/base-repository.repository';
import { InjectBaseRepository } from 'src/commom/decorators/inject-base-repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectBaseRepository(User)
    private readonly userRepository: BaseRepository<User>,
  ) {}

  async createUser(createDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createDto);
  }
}
