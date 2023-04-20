import { Controller, HttpCode, Body, Post } from '@nestjs/common';
import { AuthLoginRequestDto } from 'application/dtos/requests/auth/auth-login-request.dto';
import { OkResponse } from 'application/dtos/responses/http/ok-response.dto';
import { AuthLoginService } from 'application/services/auth/auth-login.service';
import { HttpCodes } from 'application/utils/http-codes.util';
import { Public } from 'infrastructure/nest/decorators/public.decorator';

@Controller('/auth')
export class AuthController {
  private readonly _authLoginService: AuthLoginService;

  constructor(authLoginService: AuthLoginService) {
    this._authLoginService = authLoginService;
  }

  @Post('login')
  @Public()
  @HttpCode(HttpCodes.OK)
  async login(@Body() loginDto: AuthLoginRequestDto) {
    const user = await this._authLoginService.execute(loginDto);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return OkResponse({
      token: user.token,
      user: {
        ...user,
        token: undefined,
      },
    });
  }
}
