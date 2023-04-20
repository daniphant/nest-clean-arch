import { CompanyEntity } from 'domain/entities/company.entity';
import { UserEntity } from 'domain/entities/user.entity';

export class UserCompanyAggregate extends UserEntity {
  company: CompanyEntity;

  constructor(user: UserEntity, company: CompanyEntity) {
    super(user);
    this.company = company;
  }
}
