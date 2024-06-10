import { AppException } from 'src/modules/exceptions/domain/base/app.exception';
import { ExceptionType } from 'src/modules/exceptions/domain/base/exception-type';

export class DataAccessException extends AppException {
  public readonly type: ExceptionType = ExceptionType.CLIENT;
  public static readonly CODE = 'REPO';
  constructor(public readonly repositoryErrorMessage: string) {
    super(DataAccessException.CODE, 'Bad request');
  }

  toString(): string {
    return this.repositoryErrorMessage;
  }
}
