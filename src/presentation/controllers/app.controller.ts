import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'application/decorators/public.decorator';
import { LocalAuthGuard } from 'application/guards/local.guard';
import { AuthService } from 'application/services/auth.service';
import { Request } from 'express';
import { Ok } from 'presentation/response-types/success.types';

@Controller()
export class AppController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Public()
  @UseGuards(new LocalAuthGuard())
  @Post('/auth/login')
  @HttpCode(200)
  async login(@Req() req: Request) {
    const loginData = await this._authService.login(req.user);
    return Ok(loginData);
  }
}
