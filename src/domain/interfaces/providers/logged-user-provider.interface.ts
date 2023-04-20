import { UserCompanyAggregate } from 'domain/aggregates/user-company.aggregate';

export interface ILoggedUserProvider {
  user: UserCompanyAggregate;
}
