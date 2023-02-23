const assert = require('assert');
const { test, describe } = require('mocha');

const api = require('../src/api');
let app = {};

const TOKEN = '';

const headers = {
  authorizaton: TOKEN
}

const MOCK_CREATE_HERO = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Bionica'
}

const MOCK_DEFAULT_HERO = {
  nome: 'Gavião Negro',
  poder: 'Flecha'
}

let MOCK_DEFAULT_HERO_ID = '';

describe('API Tests', function () {
  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      headers,
      payload: MOCK_DEFAULT_HERO
    });

    MOCK_DEFAULT_HERO_ID = JSON.parse(result.payload)._id;
  });

  test('GET /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      headers,
      url: '/herois?skip=0&limit=10'
    });

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(data));
  });

  test('GET /herois - should be return only 3 registers', async () => {
    const RESPONSE_LIMIT = 3;

    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=${RESPONSE_LIMIT}`
    });

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(data.length === RESPONSE_LIMIT);
  });

  test('GET /herois - should be return an error when incorrect limit query be provided', async () => {
    const RESPONSE_LIMIT = 'Aa';

    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=${RESPONSE_LIMIT}`
    });

    const errorResult = {
      statusCode: 400,
      payload: '{"statusCode":400,"error":"Bad Request","message":"child \\"limit\\" fails because [\\"limit\\" must be a number]","validation":{"source":"query","keys":["limit"]}}'
    };

    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, errorResult.payload);
  });

  test.skip('GET /herois - should be able filter one item by name', async () => {
    const ITEM_NAME = 'Homem Aranha-123894617803';

    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=100&nome=${ITEM_NAME}`
    });

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(data[0].nome, ITEM_NAME);
  });

  test('POST /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      headers,
      url: `/herois`,
      payload: MOCK_CREATE_HERO
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });

  test('PATCH /herois/:id', async () => {
    const _id = MOCK_DEFAULT_HERO_ID;

    const expected = {
      poder: 'Mira'
    };

    const result = await app.inject({
      method: 'PATCH',
      headers,
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode;
    const data = JSON.parse(result.payload);

    assert.ok(statusCode, 200);
    assert.deepEqual(data.message, 'Heroi atualizado com sucesso!');
  });

  test('PATCH /herois/:id - Não deve atualizar com ID incorreto', async () => {
    const invalid_id = `5bfdb6e83f66ad3c32939fb1`;

    const expected = {
      poder: 'Mira'
    };

    const result = await app.inject({
      method: 'PATCH',
      headers,
      url: `/herois/${invalid_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode;
    const data = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(data.message, 'Id não encontrado no banco!');
  });

  test('DELETE /herois/:id', async () => {
    const _id = MOCK_DEFAULT_HERO_ID;

    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, 'Heroi Removido com Sucesso');
  });

  test('DELETE /herois/:id - Não deve remover um ID não encontrado', async () => {
    const invalid_id = `5bfdb6e83f66ad3c32939fb1`;

    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${invalid_id}`
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(dados.message, 'Id não encontrado no banco!');
  });

  // Corrigir apenas o log que aparece nesse erro
  test.skip('DELETE /herois/:id - Não deve remover um ID inválido', async () => {
    const invalid_id = `INVALID_ID`;

    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${invalid_id}`
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 500);
    assert.deepEqual(dados.message, 'An internal server error occurred');
  });
});
