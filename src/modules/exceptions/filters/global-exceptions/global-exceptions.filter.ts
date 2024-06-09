import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AppException } from '../../domain/base/app.exception';
import { Response } from 'express';
import { EXCEPTION_TYPE_STATUSES } from '../../domain/base/exception-type';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionsFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  private readonly _logger = new Logger(GlobalExceptionsFilter.name);

  constructor() {
    super();
  }

  catch(exception: AppException, host: ArgumentsHost) {
    this._logger.error(exception);
    console.log(exception.originalError);

    if (host.getType() === 'http') {
      const response: Response = host.switchToHttp().getResponse();

      if (exception instanceof AppException) {
        const status =
          EXCEPTION_TYPE_STATUSES[exception.type] ??
          HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).send({
          statusCode: status,
          message: exception.message,
        });
      }
      return;
    }
    super.catch(exception, host);
  }
}
