import { BaseRepository } from '@common/database/base.repository';
import { User } from '@entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: BaseRepository<User>,

    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserJwt(user: User): Promise<string> {
    return this.jwtService.sign({ id: user._id });
  }
}
