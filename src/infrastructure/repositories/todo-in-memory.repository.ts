import { Injectable } from '@nestjs/common';
import { ITodoRepository } from 'domain/contracts/todo-repository.contract';
import { Todo } from 'domain/entities/todo.entity';

@Injectable()
export class InMemoryTodoRepository implements ITodoRepository {
  private readonly _todos: Todo[] = [];

  public async create(todo: Todo): Promise<Todo> {
    this._todos.push(todo);
    return todo;
  }
}
