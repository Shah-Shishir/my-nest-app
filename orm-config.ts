import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'admin',
  database: 'myNestAppDB',
  // Keep migrations/sync safe for production by default.
  synchronize:
    process.env.TYPEORM_SYNC === 'true' || process.env.NODE_ENV !== 'production',
  entities: ['dist/src/**/entities/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
  logging: true
};

export default config;
