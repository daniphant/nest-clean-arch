import { Inject, Injectable } from '@nestjs/common';
import { User } from 'domain/entities/user.entity';
import { GetUserService } from './get-user.service';
import { IHashProvider } from 'domain/contracts/hash-provider.contract';
import { INJECTABLES } from 'shared/injectables';
import { LoginDTO } from 'application/DTOs/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _getUserService: GetUserService,
    private readonly _jwtService: JwtService,
    @Inject(INJECTABLES.HASH_PROVIDER)
    private readonly _hashProvider: IHashProvider,
  ) {}

  async validateUser(dto: LoginDTO): Promise<User | null> {
    const { email, password } = dto;

    const user = await this._getUserService.getOneByEmail(email);

    if (user && this._hashProvider.compareHashSync(password, user.password)) {
      return { ...user, password: undefined };
    }

    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    return { user, accessToken: this._jwtService.sign(payload) };
  }
}
