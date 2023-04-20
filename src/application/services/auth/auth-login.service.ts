import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthLoginRequestDto } from 'application/dtos/requests/auth/auth-login-request.dto';
import { UserCompanyAggregate } from 'domain/aggregates/user-company.aggregate';
import { CompanyEntity } from 'domain/entities/company.entity';
import { UserEntity } from 'domain/entities/user.entity';
import { IAuthProvider } from 'domain/interfaces/providers/auth-provider.interface';
import { ICacheProvider } from 'domain/interfaces/providers/cache-provider.interface';
import { ICompanyRepository } from 'domain/interfaces/repositories/company-repository.interface';
import { ISessionRepository } from 'domain/interfaces/repositories/session-repository.interface';
import { IUserRepository } from 'domain/interfaces/repositories/user-repository.interface';
import { Request } from 'express';

export class AuthLoginService {
  private readonly _request: Request;
  private readonly _authRepository: IAuthProvider;
  private readonly _cacheRepository: ICacheProvider;
  private readonly _userRepository: IUserRepository;
  private readonly _sessionRepository: ISessionRepository;
  private readonly _companyRepository: ICompanyRepository;

  constructor(
    @Inject(REQUEST) request: Request,
    @Inject('IAuthProvider')
    authRepository: IAuthProvider,
    @Inject('ICacheProvider')
    cacheRepository: ICacheProvider,
    @Inject('IUserRepository')
    userRepository: IUserRepository,
    @Inject('ICompanyRepository')
    companyRepository: ICompanyRepository,
    @Inject('ISessionRepository')
    sessionRepository: ISessionRepository,
  ) {
    this._request = request;
    this._authRepository = authRepository;
    this._cacheRepository = cacheRepository;
    this._userRepository = userRepository;
    this._companyRepository = companyRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(dto: AuthLoginRequestDto) {
    // 1 - Validar se o login é valido no lado do SSO
    const ssoLoginResponse = await this._authRepository
      .login(dto.email, dto.password)
      .catch((e) => {
        console.error(e);
        throw new Error();
      });

    // TODO: Isso é só para fazer o ID funcionar com o integer na tabela.
    const idAsInteger = ssoLoginResponse.user.id
      .split('-')[0]
      .split('')
      .filter((x) => !isNaN(Number(x)))
      .join('');

    ssoLoginResponse.user.id = idAsInteger;

    this._request.user = new UserCompanyAggregate(
      new UserEntity({
        id: ssoLoginResponse.user.id,
        application_name: ssoLoginResponse.user.application_name[0],
        email: ssoLoginResponse.user.email,
        first_name: ssoLoginResponse.user.first_name,
        full_name: ssoLoginResponse.user.full_name,
        internal_code: ssoLoginResponse.user.internal_code,
        last_name: ssoLoginResponse.user.last_name,
        token: ssoLoginResponse.token,
        user_image_base64: ssoLoginResponse.user.user_image_base64,
      }),
      new CompanyEntity({
        ...ssoLoginResponse.user.company,
      }),
    );

    // 2 - Obter conexão do banco de dados do usuário logado pelo SSO
    const connectionResponse = await this._authRepository.getCompanyConnection(
      ssoLoginResponse.user.company.id,
    );

    // 3 - Salvar conexão do banco de dados do usuário logado no cache
    await this._cacheRepository.set(
      `company:${ssoLoginResponse.user.company.id}:connection`,
      {
        type: connectionResponse.type,
        host: connectionResponse.host,
        port: connectionResponse.port,
        user: connectionResponse.username,
        password: connectionResponse.password,
        database: connectionResponse.database_name,
        company_id: ssoLoginResponse.user.company.id,
      },
    );

    // Caso a companhia nao exista no banco de dados local, criar a companhia
    const company = await this._companyRepository.getByPrimary(
      ssoLoginResponse.user.company.id,
    );

    if (company === null || company === undefined) {
      await this._companyRepository.create({
        id: ssoLoginResponse.user.company.id,
        name: ssoLoginResponse.user.company.name,
      });
    }

    // 4 - Caso o usuário não exista no banco de dados local, criar o usuário
    const user = await this._userRepository.getByPrimary(
      ssoLoginResponse.user.id,
    );

    if (user === null || user === undefined) {
      await this._userRepository.create({
        id: ssoLoginResponse.user.id,
      });
    }

    // 5 - Gravar token de acesso do usuário logado na sessão do usuário
    await this._sessionRepository.create({
      token: ssoLoginResponse.token,
      userId: user.id,
    });

    // 6 - Retornar token de acesso do usuário logado juntamente aos dados do usuário
    return this._request.user;
  }
}
