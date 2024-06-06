import { AppException } from '../base/app.exception';
import { ExceptionType } from '../base/exception-type';

export class ServerException extends AppException {
  public readonly type: ExceptionType = ExceptionType.SERVER;
}
