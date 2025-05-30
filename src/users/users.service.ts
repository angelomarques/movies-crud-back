import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-repository/base-repository.repository';
import { InjectBaseRepository } from 'src/commom/decorators/inject-base-repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectBaseRepository(User)
    private readonly userRepository: BaseRepository<User>,
  ) {}

  async createUser(createDto: CreateUserDto): Promise<User> {
    const { password, email, name } = createDto;

    await this.userRepository.findOneOrFail({ where: { email } });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: CreateUserDto = { name, email, password: hashedPassword };

    return this.userRepository.create(newUser);
  }
}
