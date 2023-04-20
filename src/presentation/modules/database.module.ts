import { Module, Global } from '@nestjs/common';
import { UserRepository } from 'infrastructure/implementations//repositories/user.repository';
import { ProviderModule } from './provider.module';
import { CompanyRepository } from 'infrastructure/implementations/repositories/company.repository';
import { SessionRepository } from 'infrastructure/implementations/repositories/session.repository';

// A chave provide deve bater com o nome da interface que será injetada, e deve ser o mesmo nome no token usado no Inject
const UserKnexRepository = {
  provide: 'IUserRepository',
  useClass: UserRepository,
};

const CompanyKnexRepository = {
  provide: 'ICompanyRepository',
  useClass: CompanyRepository,
};

const SessionKnexRepository = {
  provide: 'ISessionRepository',
  useClass: SessionRepository,
};

// Módulo responsável por expor os repositórios Knex para o container de injeção de dependência
@Global()
@Module({
  imports: [ProviderModule],
  providers: [UserKnexRepository, CompanyKnexRepository, SessionKnexRepository],
  exports: [UserKnexRepository, CompanyKnexRepository, SessionKnexRepository],
})
export class DatabaseModule {}
