const assert = require('assert');
const { test, describe } = require('mocha');

const Context = require('../src/db/strategies/base/context-strategy');
const Postgres = require('../src/db/strategies/postgres/postgres');
const UserSchema = require('../src/db/strategies/postgres/schemas/user-schema');

const api = require('../src/api');
let app = {};

describe('Auth Test Suite', function () {
  this.beforeAll(async () => {
    app = await api;
  });

  test('should be able get one token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'xuxadasilva',
        password: '123'
      }
    });

    const statusCode = result.statusCode;
    const data = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(data.token.length > 10);
  });
});
