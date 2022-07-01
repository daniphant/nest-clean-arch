import { HttpCode } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoDTO } from 'application/DTOs/create-todo.dto';
import { CreateTodoService } from 'application/services/create-todo.service';
import { IJsonResponse } from 'domain/contracts/json-response.contract';
import { Todo } from 'domain/entities/todo.entity';
import { Created } from '../response-types/success.types';

@Controller('todo')
export class TodoController {
  constructor(private readonly _createTodoService: CreateTodoService) {}

  @Post()
  @HttpCode(201)
  public async create(
    @Body() dto: CreateTodoDTO,
  ): Promise<IJsonResponse<Todo>> {
    const todo = await this._createTodoService.create(dto);
    return Created(todo);
  }
}
