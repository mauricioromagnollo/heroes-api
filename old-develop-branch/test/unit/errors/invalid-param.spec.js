import { describe, test, expect } from '@/test/ports/index.js';
import { InvalidParamError } from '@/errors/index.js';
import { STATUS_CODE } from '@/helpers/index.js';

const INVALID_PARAM = 'invalid_param';
const invalidParamError = new InvalidParamError(INVALID_PARAM);

describe('Invalid Param Error', () => {
  test('should be contain message property', () => {
    expect(invalidParamError.message).toBe(`Invalid param '${INVALID_PARAM}'`);
  });

  test('should be contain statusCode property with value 500', () => {
    expect(invalidParamError.statusCode).toBe(STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  test('should be contain name property with the same error class name', () => {
    expect(invalidParamError.name).toBe('InvalidParamError');
  });
});
