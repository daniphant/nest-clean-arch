import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoService } from 'application/services/create-todo.service';
import { DatabaseModule } from 'presentation/modules/database.module';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let controller: TodoController;
  let service: CreateTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [CreateTodoService],
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<CreateTodoService>(CreateTodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should return an IJsonResponse containing a Todo', async () => {
      const todo = {
        title: 'test',
        description: 'test',
        completed: true,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve({ id: 'teste', ...todo }));

      const result = await controller.create(todo);
      expect(result.statusCode).toBe(201);
      expect(result.data.title).toEqual(todo.title);
      expect(result.data).toHaveProperty('id');
    });
  });
});
