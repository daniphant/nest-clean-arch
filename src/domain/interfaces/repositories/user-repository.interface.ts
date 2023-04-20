import { UserEntity } from 'domain/entities/user.entity';

export interface IUserRepository {
  getByPrimary(id?: string, email?: string): Promise<UserEntity>;
  create(data: Partial<UserEntity>): Promise<UserEntity>;
}
