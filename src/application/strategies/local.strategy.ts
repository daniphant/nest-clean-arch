import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'application/services/auth.service';
import { UnauthorizedException } from 'application/exceptions/unauthorized.exception';
import { LoginDTO } from 'application/DTOs/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const dto = new LoginDTO(email, password);
    const user = await this.authService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException('invalid username or password');
    }

    return user;
  }
}
