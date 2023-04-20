import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { IDatabaseConnection } from 'domain/interfaces/contracts/database-connection.interface';
import { ICacheProvider } from 'domain/interfaces/providers/cache-provider.interface';
import { ILoggedUserProvider } from 'domain/interfaces/providers/logged-user-provider.interface';
import { getKnexInstance } from 'infrastructure/knex/config/knex-get-instance';

// Se seu repositório não está funcionando, confira se ele foi exportado pelo knex.module.ts
@Injectable()
export class BaseKnexRepository {
  private connectionOverride: IDatabaseConnection;
  protected readonly _cache: ICacheProvider;
  protected readonly _loggedUserProvider: ILoggedUserProvider;

  constructor(
    @Inject('ICacheProvider') cache: ICacheProvider,
    @Inject('ILoggedUserProvider') loggedUserProvider: ILoggedUserProvider,
  ) {
    this._cache = cache;
    this._loggedUserProvider = loggedUserProvider;

    if (process.env.SHOULD_OVERRIDE_DB_CONNECTION) {
      this.defaultConnectionOverrideFromEnvironment();
    }
  }

  private defaultConnectionOverrideFromEnvironment(): void {
    this.connectionOverride = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      type: process.env.DB_TYPE,
      port: process.env.DB_PORT,
      company_id: '',
    };
  }

  protected async getKnexInstance(): Promise<Knex> {
    if (this.connectionOverride) {
      return getKnexInstance(this.connectionOverride);
    }

    const connection = await this._cache.get<IDatabaseConnection>(
      `company:${this._loggedUserProvider.user.company.id}:connection`,
    );

    return getKnexInstance(connection);
  }

  public setKnexInstanceOverride(connectionInfo: IDatabaseConnection): void {
    this.connectionOverride = connectionInfo;
  }

  public clearKnexInstanceOverride(): void {
    this.connectionOverride = undefined;
  }
}
