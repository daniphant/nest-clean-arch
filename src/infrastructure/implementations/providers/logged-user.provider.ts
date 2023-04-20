import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserCompanyAggregate } from 'domain/aggregates/user-company.aggregate';
import { ILoggedUserProvider } from 'domain/interfaces/providers/logged-user-provider.interface';
import { Request } from 'express';

@Injectable()
export class LoggedUserProvider implements ILoggedUserProvider {
  private readonly _request: Request;

  constructor(@Inject(REQUEST) req: Request) {
    this._request = req;
  }

  public get user(): UserCompanyAggregate {
    return this._request.user as UserCompanyAggregate;
  }
}
