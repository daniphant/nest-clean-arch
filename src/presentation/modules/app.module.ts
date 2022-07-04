import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { TodoModule } from './todo.module';

@Module({
  imports: [TodoModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
