import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ISSODatabaseConnection } from 'domain/interfaces/contracts/sso-database-connection.interface';
import { ISsoSessionsEndpointResponse } from 'domain/interfaces/contracts/sso-sessions-endpoint-response.interface';
import { IAuthProvider } from 'domain/interfaces/providers/auth-provider.interface';
import { ILoggedUserProvider } from 'domain/interfaces/providers/logged-user-provider.interface';
import { Request } from 'express';
import { AxiosApiClient } from 'infrastructure/axios/axios-api-client';

Injectable();
export class AuthProvider implements IAuthProvider {
  private readonly _axiosApiClient: AxiosApiClient;
  private readonly _loggedUserProvider: ILoggedUserProvider;

  constructor(
    @Inject(AxiosApiClient) axiosApiClient: AxiosApiClient,
    @Inject('ILoggedUserProvider') loggedUserProvider: ILoggedUserProvider,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this._axiosApiClient = axiosApiClient;
    this._loggedUserProvider = loggedUserProvider;
  }

  public async login(
    email: string,
    password: string,
  ): Promise<ISsoSessionsEndpointResponse> {
    const loginSSOResponse = await this._axiosApiClient.post(
      `${process.env.SSO_URL}/sessions`,
      {
        email,
        password,
      },
    );

    return loginSSOResponse.data as ISsoSessionsEndpointResponse;
  }

  public async validateToken(
    token: string,
  ): Promise<ISsoSessionsEndpointResponse> {
    const validateTokenResponse = await this._axiosApiClient.post(
      `${process.env.SSO_URL}/users/token-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return validateTokenResponse.data as ISsoSessionsEndpointResponse;
  }

  public async getCompanyConnection(
    id: string,
  ): Promise<ISSODatabaseConnection> {
    const connectionResponse = await this._axiosApiClient.post(
      `${process.env.SSO_URL}/globals/conn-all-companies`,
      {
        application_name: 'PRICE_PROMO',
        company_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${this._loggedUserProvider.user.token}`,
        },
      },
    );

    return Array.isArray(connectionResponse.data)
      ? connectionResponse.data[0]
      : connectionResponse.data;
  }
}
