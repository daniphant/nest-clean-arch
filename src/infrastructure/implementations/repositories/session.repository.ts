import { Injectable } from '@nestjs/common/decorators';
import { ISessionRepository } from 'domain/interfaces/repositories/session-repository.interface';
import { BaseKnexRepository } from './base-knex.repository';

@Injectable()
export class SessionRepository
  extends BaseKnexRepository
  implements ISessionRepository
{
  public async create(data: any): Promise<any> {
    const knex = await this.getKnexInstance();

    try {
      // Should expire in 48 hours
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 48);

      const session = await knex('Sessions')
        .withSchema('Varejo')
        .insert({
          cdUser: data.userId,
          cdToken: data.token,
          dhExpiraton: expirationDate,
        })
        .returning('*');

      return session[0];
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }

  public async getUserSessionByToken(token: string): Promise<any> {
    const knex = await this.getKnexInstance();

    try {
      const session = await knex('Sessions')
        .withSchema('Varejo')
        .select(
          'cdUser as userId',
          'cdToken as token',
          'dhExpiration as expiration',
        )
        .where('cdToken', token)
        .first();

      return session;
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }

  public async getUserSessions(userId: string): Promise<any> {
    const knex = await this.getKnexInstance();

    try {
      const sessions = await knex('Sessions')
        .withSchema('Varejo')
        .select(
          'cdUser as userId',
          'cdToken as token',
          'dhExpiration as expiration',
        )
        .where('cdUser', userId);

      return sessions;
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }
}
