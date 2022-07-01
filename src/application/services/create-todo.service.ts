import { Inject, Injectable } from '@nestjs/common';
import { ITodoRepository } from 'domain/contracts/todo-repository.contract';
import { Todo } from 'domain/entities/todo.entity';
import { INJECTABLES } from 'shared/injectables';
import { CreateTodoDTO } from '../DTOs/create-todo.dto';

@Injectable()
export class CreateTodoService {
  constructor(
    @Inject(INJECTABLES.TODO_REPOSITORY)
    private readonly _todoRepository: ITodoRepository,
  ) {}

  public create(dto: CreateTodoDTO): Promise<Todo> {
    const todo = new Todo(dto);
    return this._todoRepository.create(todo);
  }
}
