import { Module } from '@nestjs/common';
import { InMemoryUsersRepository } from 'infrastructure/repositories/users-in-memory.repository';
import { INJECTABLES } from 'shared/injectables';
import { InMemoryTodoRepository } from '../../infrastructure/repositories/todo-in-memory.repository';

const AliasedTodoRepository = {
  provide: INJECTABLES.TODO_REPOSITORY,
  useClass: InMemoryTodoRepository,
};

const AliasedUsersRepository = {
  provide: INJECTABLES.USER_REPOSITORY,
  useClass: InMemoryUsersRepository,
};

@Module({
  providers: [AliasedTodoRepository, AliasedUsersRepository],
  exports: [AliasedTodoRepository, AliasedUsersRepository],
})
export class DatabaseModule {}
