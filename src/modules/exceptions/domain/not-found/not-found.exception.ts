import { AppException } from '../base/app.exception';
import { ExceptionType } from '../base/exception-type';

export class NotFoundException extends AppException {
  public readonly type: ExceptionType = ExceptionType.NOT_FOUND;
}
