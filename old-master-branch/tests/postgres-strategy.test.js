const assert = require('assert');
const { test, describe } = require('mocha');

const Postgres = require('../src/db/strategies/postgres/postgres');
const HeroiSchema = require('../src/db/strategies/postgres/schemas/heroi-schema');
const ContextStrategy = require('../src/db/strategies/base/context-strategy');


const MOCK_HEROI_CADASTRAR = {
  nome: 'Gavião Negro',
  poder: 'Flexas'
}
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Batman',
  poder: 'Dinheiro'
}

let context = {};

describe('Postgres Strategy', function() {
  this.timeout(Infinity);

  this.beforeAll(async function() {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroiSchema);
    context = new ContextStrategy(new Postgres(connection, model));

    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  this.afterAll(async function() {
    await context.delete();
  });


  test('should be able to connect with PostgreSQL', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  test('should be able add new hero', async () => {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  test('should be able to list one hero by name', async () => {
    const [ result ] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  test('should be able update one hero', async () => {
    const [ itemAtualizar ] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha'
    }

    const [result] = await context.update(itemAtualizar.id, novoItem);

    const [ itemAtualizado ] = await context.read({ id: itemAtualizar.id })

    assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    assert.deepEqual(result, 1);
  });

  test('should be able remove one hero', async () => {
    const [ item ] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});
