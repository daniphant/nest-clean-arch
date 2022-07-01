import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import { User } from 'domain/entities/user.entity';

@Injectable()
export class InMemoryUsersRepository implements IUsersRepository {
  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User> {
    return Promise.resolve(
      new User({
        id: 'test',
        username: 'test',
        password: 'test',
        email: 'teste@teste.com',
        firstName: 'test',
        lastName: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }
}
