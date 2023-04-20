import { Controller, Get, UseGuards } from '@nestjs/common';
import { getAppVersion } from 'application/utils/app-version.util';
import { Public } from 'infrastructure/nest/decorators/public.decorator';
import { JwtAuthGuard } from 'infrastructure/nest/guards/jwt.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  @Get()
  @Public()
  getHello(): string {
    return `Promo Backend by Pricemet - Version ${getAppVersion()}`;
  }

  @Get('test-auth')
  testAuth(): string {
    return `Se você está vendo isso, é porque você está autenticado!`;
  }
}
