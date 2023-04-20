import { Module } from '@nestjs/common';
import { AuthController } from 'presentation/controllers/auth/auth.controller';
import { AuthLoginService } from 'application/services/auth/auth-login.service';
import { JwtAuthGuard } from 'infrastructure/nest/guards/jwt.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthLoginService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
