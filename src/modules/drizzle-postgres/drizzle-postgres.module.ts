import { ConfigurableModuleBuilder, DynamicModule, Global } from '@nestjs/common';
import { IDrizzlePostgresModuleOptions } from './domain/drizzle-postgres-module-options.interface';
import { DrizzlePostgresService } from './services/drizzle-postgres/drizzle-postgres.service';
import { POSTGRES_DB } from './constants';

const { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<IDrizzlePostgresModuleOptions>().setClassMethodName('forRoot').build();

type Options = typeof OPTIONS_TYPE;
type AsyncOptions = typeof ASYNC_OPTIONS_TYPE;

@Global()
export class DrizzlePostgresModule extends ConfigurableModuleClass {
  public static forRoot(options: Options): DynamicModule {
    const { providers = [], exports = [], ...other } = super.forRoot(options);

    return {
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: POSTGRES_DB,
          useFactory: async (drizzleService: DrizzlePostgresService) => {
            return drizzleService.getDrizzle(options.db, options.schema);
          },
          inject: [DrizzlePostgresService],
        },
      ],
      exports: [...exports, POSTGRES_DB],
      ...other,
    };
  }

  public static forRootAsync(options: AsyncOptions): DynamicModule {
    const { providers = [], exports = [], ...other } = super.forRootAsync(options);

    return {
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: POSTGRES_DB,
          useFactory: async (drizzleService: DrizzlePostgresService, options: IDrizzlePostgresModuleOptions) => {
            return drizzleService.getDrizzle(options.db, options.schema);
          },
          inject: [DrizzlePostgresService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, POSTGRES_DB],
      ...other,
    };
  }
}
