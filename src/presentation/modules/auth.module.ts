import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'application/services/auth.service';
import { JwtStrategy } from 'application/strategies/jwt.strategy';
import { LocalStrategy } from 'application/strategies/local.strategy';
import { DatabaseModule } from './database.module';
import { ExternalModule } from './external.module';
import { UsersModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConstants from 'shared/jwtConstants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'application/guards/jwt.guard';

@Module({
  imports: [
    ExternalModule,
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
