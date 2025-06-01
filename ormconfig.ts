import { DataSource, DataSourceOptions } from 'typeorm'; // Import from 'typeorm'
import * as dotenv from 'dotenv';

dotenv.config();

export const OrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  entities: [`${__dirname}/src/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/src/**/migration/*.{ts,js}`],
  logging: false,
  synchronize: false,
  migrationsRun: false,
};

const AppDataSource = new DataSource(OrmConfig);

export default AppDataSource;
