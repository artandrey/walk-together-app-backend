import { AppException } from '../base/app.exception';
import { ExceptionType } from '../base/exception-type';

export class NotAllowedException extends AppException {
  public readonly type: ExceptionType = ExceptionType.NOT_ALLOWED;
}
