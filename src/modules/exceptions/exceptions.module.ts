import { Module } from '@nestjs/common';
import { GlobalExceptionsFilter } from './filters/global-exceptions/global-exceptions.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { AppExceptionMapper } from './mapper/app-exception/app-exception.mapper';

@Module({
  providers: [
    {
      useClass: GlobalExceptionsFilter,
      provide: APP_FILTER,
    },
    {
      useClass: ErrorInterceptor,
      provide: APP_INTERCEPTOR,
    },
    AppExceptionMapper,
  ],
})
export class ExceptionsModule {}
