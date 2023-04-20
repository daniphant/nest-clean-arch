import { Module, Global } from '@nestjs/common';
import { AxiosApiClient } from 'infrastructure/axios/axios-api-client';
import { AuthProvider } from 'infrastructure/implementations/providers/auth.provider';
import { CacheProvider } from 'infrastructure/implementations/providers/cache.provider';
import { LoggedUserProvider } from 'infrastructure/implementations/providers/logged-user.provider';

const ssoAuthProvider = {
  provide: 'IAuthProvider',
  useClass: AuthProvider,
};

const cacheProvider = {
  provide: 'ICacheProvider',
  useClass: CacheProvider,
};

const loggedUserProvider = {
  provide: 'ILoggedUserProvider',
  useClass: LoggedUserProvider,
};

@Global()
@Module({
  imports: [],
  providers: [
    loggedUserProvider,
    ssoAuthProvider,
    cacheProvider,
    AxiosApiClient,
  ],
  exports: [loggedUserProvider, ssoAuthProvider, cacheProvider],
})
export class ProviderModule {}
