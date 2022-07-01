import { randomUUID } from 'crypto';

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!props.id) this.id = randomUUID();
  }
}
