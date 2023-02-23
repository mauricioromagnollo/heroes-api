const assert = require('assert');
const { test, describe } = require('mocha');

const PasswordHelper = require('../src/helpers/password-helper');

const SENHA = 'x0n4d0123';

describe.only('UserHelper test suite', function() {
  test('deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });

  test('deve ser possível comparar uma senha com a mesma em hash', async () => {
    const password = 'any_password';
    const hashedPassword = await PasswordHelper.hashPassword(password);
    const isSamePassword = await PasswordHelper.compare(password, hashedPassword);
    assert.ok(isSamePassword);
  });
});
