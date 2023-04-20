import { CompanyEntity } from 'domain/entities/company.entity';

export interface ICompanyRepository {
  getByPrimary(id?: string): Promise<CompanyEntity>;
  create(data: Partial<CompanyEntity>): Promise<CompanyEntity>;
}
