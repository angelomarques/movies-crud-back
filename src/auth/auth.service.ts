import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { SignUpDto } from './dtos/sign-up.dto';

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  private readonly secret: string;
  private readonly expiresIn = '1d';

  constructor(
    private userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    const secretToSet = this.configService.get<string>('JWT_SECRET');

    if (!secretToSet) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    this.secret = secretToSet;
  }

  private signToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded;
    } catch (_error: any) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async login(payload: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(payload.email);

    const isPasswordValid = await compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return { token };
  }

  async signUp(payload: SignUpDto): Promise<void> {
    await this.userService.createUser(payload);
  }
}
