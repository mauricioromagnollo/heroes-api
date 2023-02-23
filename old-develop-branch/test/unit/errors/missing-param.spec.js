import { describe, test, expect } from '@/test/ports/index.js';
import { MissingParamError } from '@/errors/index.js';
import { STATUS_CODE } from '@/helpers/index.js';

const MISSING_PARAM = 'missing_param';
const missingParamError = new MissingParamError(MISSING_PARAM);

describe('Missing Param Error', () => {
  test('should be contain message property', () => {
    expect(missingParamError.message).toBe(`Missing param '${MISSING_PARAM}'`);
  });

  test('should be contain statusCode property with value 500', () => {
    expect(missingParamError.statusCode).toBe(STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  test('should be contain name property with the same error class name', () => {
    expect(missingParamError.name).toBe('MissingParamError');
  });
});
