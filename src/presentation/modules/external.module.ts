import { Module } from '@nestjs/common';
import { BcryptHashProvider } from 'infrastructure/external/bcrypt-hash-provider.external';
import { INJECTABLES } from 'shared/injectables';

const AliasedHashProvider = {
  provide: INJECTABLES.HASH_PROVIDER,
  useClass: BcryptHashProvider,
};

@Module({
  providers: [AliasedHashProvider],
  exports: [AliasedHashProvider],
})
export class ExternalModule {}
