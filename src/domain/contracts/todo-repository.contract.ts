import { Todo } from '../entities/todo.entity';

export interface ITodoRepository {
  create(todo: Todo): Promise<Todo>;
}
