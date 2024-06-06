import { ServerException } from '../server-exception/server.exception';

export class UnexpectedException extends ServerException {
  constructor(error: unknown) {
    super('UNEX', 'Unexpected server exception', error);
  }
}
