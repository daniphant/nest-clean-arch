import { BaseKnexRepository } from './base-knex.repository';
import { UserEntity } from 'domain/entities/user.entity';
import { IUserRepository } from 'domain/interfaces/repositories/user-repository.interface';

export class UserRepository
  extends BaseKnexRepository
  implements IUserRepository
{
  public async getByPrimary(id?: string, email?: string): Promise<UserEntity> {
    const knex = await this.getKnexInstance();

    try {
      const user = await knex<UserEntity>('Users')
        .withSchema('Varejo')
        .select('cdUser as id')
        .modify((queryBuilder) => {
          if (id) {
            queryBuilder.where('cdUser', id);
          }
          // if (email) {
          // queryBuilder.where('email', email);
          // }
        })
        .first();

      return user;
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }

  public async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const knex = await this.getKnexInstance();

    try {
      const user = await knex('Users')
        .withSchema('Varejo')
        .insert({
          cdUser: data.id,
          cdClient: this._loggedUserProvider.user.company.id,
        })
        .returning('*');

      return user[0];
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }
}
