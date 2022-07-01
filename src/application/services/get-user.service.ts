import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from 'domain/contracts/users-repository.contract';
import { User } from 'domain/entities/user.entity';
import { INJECTABLES } from 'shared/injectables';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(INJECTABLES.USER_REPOSITORY)
    private readonly _usersRepository: IUsersRepository,
  ) {}

  async getOneById(id: number): Promise<User> {
    return this._usersRepository.findById(id);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this._usersRepository.findByEmail(email);
  }
}
