import knex, { Knex } from 'knex';
import { IDatabaseConnection } from 'domain/interfaces/contracts/database-connection.interface';
import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '..', '..', '..', '..', '.env') });

const rootDir = process.env.NODE_ENV == 'LOCAL' ? 'src' : 'dist';

const runMigrationDir = join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  rootDir,
  'infrastructure',
  'database',
  'knex',
  'migrations',
);

const toggleKnexLogging = (instance: Knex) => {
  instance.on('query', (query) => {
    const sql = query.sql.replace(/\$\d+/g, '?');

    if (process.env.NODE_ENV !== 'PRODUCTION') {
      console.log(instance.raw(sql, query.bindings).toQuery());
    }
  });
};

const makeKnex = (connection: IDatabaseConnection) => {
  return process.env.NODE_ENV == 'test'
    ? knex({
        client: process.env.TEST_DB_CLIENT,
        connection: {
          host: process.env.TEST_DB_HOST,
          port: Number(process.env.TEST_DB_PORT),
          user: process.env.TEST_DB_USER,
          password: process.env.TEST_DB_PASSWORD,
          database: process.env.TEST_DB_DATABASE,
        },
        migrations: {
          directory: runMigrationDir,
          extension: 'js',
        },
      })
    : knex({
        client: connection.type,
        connection: {
          host:
            process.env.NODE_ENV === 'LOCAL'
              ? process.env.DB_HOST
              : connection.host,
          port: Number(connection.port),
          user: connection.user,
          password: connection.password,
          database: connection.database,
        },
        migrations: {
          directory: runMigrationDir,
          extension: 'js',
        },
      });
};

export const getKnexInstance = async (connection: IDatabaseConnection) => {
  if (process.env.NODE_ENV !== 'LOCAL') console.log(connection);

  const instance = makeKnex(connection);
  toggleKnexLogging(instance);

  return instance;
};
