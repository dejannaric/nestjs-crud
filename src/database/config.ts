import {DataSourceOptions} from "typeorm";

export function getConfig() {
  return {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'troniusgaming',
    entities: ["**/*.entity{.ts}"],
    synchronize: true, // for simplicity purposes using synchronize instead of setting up migrations
    autoLoadEntities: true
  } as DataSourceOptions;
}