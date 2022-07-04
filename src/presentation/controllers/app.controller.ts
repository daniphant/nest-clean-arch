import { Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { Public } from 'application/decorators/public.decorator';
import { Request } from 'express';
import { Ok } from 'presentation/response-types/success.types';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Public()
  @Post('/auth/login')
  @HttpCode(200)
  async login(@Req() req: Request) {
    return Ok({});
  }
}
