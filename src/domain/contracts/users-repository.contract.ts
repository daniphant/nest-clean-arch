import { User } from 'domain/entities/user.entity';

export interface IUsersRepository {
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
