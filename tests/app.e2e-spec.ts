import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/infrastructure/nestjs/modules/app.module';
import { getAppVersion } from 'application/utils/app-version.util';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const appVersion = getAppVersion();

    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(`Promo Backend by Pricemet - Version ${appVersion}`);
  });
});
