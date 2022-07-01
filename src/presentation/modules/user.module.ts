import { Module } from '@nestjs/common';
import { GetUserService } from 'application/services/get-user.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  providers: [GetUserService],
  exports: [GetUserService],
})
export class UsersModule {}
