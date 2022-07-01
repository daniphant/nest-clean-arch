import { Module } from '@nestjs/common';
import { CreateTodoService } from 'application/services/create-todo.service';
import { DatabaseModule } from 'presentation/modules/database.module';
import { TodoController } from '../controllers/todo.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [CreateTodoService],
})
export class TodoModule {}
