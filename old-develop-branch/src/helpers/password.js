import bcrypt from 'bcrypt';
import { promisify } from 'util';
import { MissingParamError } from '@/errors/index.js';

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.hash);

export class PasswordHelper {
  static generateHashPassword(password) {
    if (!password) {
      throw new MissingParamError('password');
    }

    const PASSWORD_SALT = 3; // save in .env
    return hashAsync(password, PASSWORD_SALT);
  }

  static isPasswordEqualHash({ password, hashPassword } = {}) {
    if (!password) {
      throw new MissingParamError('password');
    }

    if (!hashPassword) {
      throw new MissingParamError('hashPassword');
    }

    return compareAsync(password, hashPassword);
  }
}
