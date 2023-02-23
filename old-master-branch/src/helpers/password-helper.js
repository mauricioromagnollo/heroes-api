const bcrypt = require('bcrypt');
const { promisify } = require('util');

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

const SALT = 3;

class PasswordHelper {
  static hashPassword(password) {
    return hashAsync(password, SALT);
  }

  static compare(password, hashedPassword) {
    return compareAsync(password, hashedPassword);
  }
}

module.exports = PasswordHelper;
