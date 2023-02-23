import { describe, test, expect } from '@/test/ports/index.js';
import { MissingParamError } from '@/errors/index.js';
import { PasswordHelper, STATUS_CODE } from '@/helpers/index.js';

describe('PasswordHelper', () => {
  describe('.generateHashPassword()', () => {
    test('should be able generate one hash password', async () => {
      const password = 'any_password';
      const hashPassword = await PasswordHelper.generateHashPassword(password);
      expect(hashPassword).toHaveLength(60);
    });

    test('should be throw MissingParamError if password param is not provided', async () => {
      try {
        await PasswordHelper.generateHashPassword();
      } catch (error) {
        expect(error).toBeInstanceOf(MissingParamError);
        expect(error.message).toBe('Missing param \'password\'');
        expect(error.statusCode).toEqual(STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('.isPasswordEqualHash()', () => {
    test('should be able compare password with hash', async () => {
      const password = 'any_password';
      const hashPassword = await PasswordHelper.generateHashPassword(password);
      const isEqual = await PasswordHelper.isPasswordEqualHash({
        password, hashPassword,
      });
      expect(isEqual).toBeTruthy();
    });

    test('should be throw MissingParamError if password param is not provided', async () => {
      try {
        await PasswordHelper.isPasswordEqualHash();
      } catch (error) {
        expect(error).toBeInstanceOf(MissingParamError);
        expect(error.message).toBe('Missing param \'password\'');
        expect(error.statusCode).toEqual(STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });

    test('should be throw MissingParamError if hashPassword param is not provided', async () => {
      const password = 'any_password';

      try {
        await PasswordHelper.isPasswordEqualHash({ password });
      } catch (error) {
        expect(error).toBeInstanceOf(MissingParamError);
        expect(error.message).toBe('Missing param \'hashPassword\'');
        expect(error.statusCode).toEqual(STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
