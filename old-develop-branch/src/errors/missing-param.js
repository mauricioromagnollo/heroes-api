import { STATUS_CODE } from '@/helpers/index.js';

export class MissingParamError extends Error {
  constructor(paramName) {
    super(`Missing param '${paramName}'`);
    this.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
    this.name = 'MissingParamError';
  }
}
