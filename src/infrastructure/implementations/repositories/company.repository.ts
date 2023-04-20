import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'domain/entities/company.entity';
import { ICompanyRepository } from 'domain/interfaces/repositories/company-repository.interface';
import { BaseKnexRepository } from './base-knex.repository';

@Injectable()
export class CompanyRepository
  extends BaseKnexRepository
  implements ICompanyRepository
{
  async getByPrimary(id?: string): Promise<CompanyEntity> {
    const knex = await this.getKnexInstance();

    try {
      const company = await knex<CompanyEntity>('Clients')
        .withSchema('Varejo')
        .select('cdClient as id', 'nmClient as name')
        .modify((queryBuilder) => {
          if (id) {
            queryBuilder.where('cdClient', id);
          }
        })
        .first();

      return company;
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }

  async create(data: Partial<CompanyEntity>): Promise<CompanyEntity> {
    const knex = await this.getKnexInstance();

    try {
      const company = await knex('Clients')
        .withSchema('Varejo')
        .insert({
          cdClient: data.id,
          nmClient: data.name,
        })
        .returning('*');

      return company[0];
    } catch (error) {
      throw error;
    } finally {
      knex.destroy();
    }
  }
}
