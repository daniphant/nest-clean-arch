import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @MaxLength(100)
  public title: string;

  @IsString()
  @MaxLength(255)
  public description: string;

  @IsBoolean()
  public completed: boolean;

  constructor(title: string, description: string, completed: boolean) {
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}
