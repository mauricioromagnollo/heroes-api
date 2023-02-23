import { describe, test, expect } from '@/test/ports/index.js';
import { STATUS_CODE } from '@/helpers/index.js';

describe('Status Code', () => {
  test('should be validate status code enum file', () => {
    expect(STATUS_CODE.OK).toBe(200);
  });
});
