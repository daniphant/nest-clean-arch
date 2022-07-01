import { Test, TestingModule } from '@nestjs/testing';
import { ITodoRepository } from 'domain/contracts/todo-repository.contract';
import { DatabaseModule } from 'presentation/modules/database.module';
import { INJECTABLES } from 'shared/injectables';
import { CreateTodoService } from './create-todo.service';

describe('TodoService', () => {
  let service: CreateTodoService;
  let repository: ITodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [CreateTodoService],
    }).compile();

    service = module.get<CreateTodoService>(CreateTodoService);
    repository = module.get<ITodoRepository>(INJECTABLES.TODO_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should return a created todo with an ID', async () => {
      const todo = {
        title: 'test',
        description: 'test',
        completed: true,
      };

      jest
        .spyOn(repository, 'create')
        .mockImplementation((todo) =>
          Promise.resolve({ ...todo, id: 'teste' }),
        );

      const result = await service.create(todo);
      expect(result.id).toBeDefined();
      expect(result.title).toEqual(todo.title);
    });
  });
});
