import { STATUS_CODE } from '@/helpers/index.js';

export class InvalidParamError extends Error {
  constructor(paramName) {
    super(`Invalid param '${paramName}'`);
    this.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
    this.name = 'InvalidParamError';
  }
}
