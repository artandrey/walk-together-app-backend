import { DrizzleDbOptions } from './drizzle-db-options';

export interface IDrizzlePostgresModuleOptions {
  db: DrizzleDbOptions;
  schema: Record<string, unknown>;
}
