import { randomUUID } from 'crypto';

export class Todo {
  public id: string;
  public title: string;
  public completed: boolean;

  constructor(props: Partial<Todo>) {
    Object.assign(this, props);

    if (!props.id) this.id = randomUUID();
  }
}
