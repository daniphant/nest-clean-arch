import { Module } from '@nestjs/common';
import { AppController } from 'presentation/controllers/app/app.controller';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { ProviderModule } from './provider.module';

@Module({
  imports: [DatabaseModule, ProviderModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
