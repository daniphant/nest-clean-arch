import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { AuthModule } from './auth.module';
import { TodoModule } from './todo.module';

@Module({
  imports: [TodoModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
