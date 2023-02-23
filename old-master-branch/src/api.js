const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert')

const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev' || env === 'test', 'a env é inválida');

const configPath = join(__dirname, './config', `.env.${env}`);
config({
  path: configPath
})

const Hapi = require('hapi');
const HapiJwt = require('hapi-auth-jwt2');
const Context = require('./db/strategies/base/context-strategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroi-schema');
const HeroRoute = require('./routes/hero-routes');
const AuthRoute = require('./routes/auth-routes');

// const HapiSwagger = require('hapi-swagger');
// const Vision = require('@hapi/vision');
// const Inert = require('inert');

const JWT_SECRET = 'MEU_SEGREDO_123';

const app = new Hapi.Server({
  port: 5000
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroiSchema));

  // const swaggerOptions = {
  //   info: {
  //     title: 'Heroes API',
  //     version: 'v1.0.0'
  //   },
  //   lang: 'pt'
  // }

  // await app.register([
  //   Vision,
  //   Inert,
  //   {
  //     plugin: HapiSwagger,
  //     options: swaggerOptions
  //   }
  // ])

  await app.register([
    HapiJwt
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: (data, request) => {
      // verifica no banco se o usuário continua ativo
      // verifica no banco se o usuário continua pagando
      return {
        isValid: true
      }
    }
  });

  app.auth.default('jwt');

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
  ]);

  await app.start();
  console.log('Servidor rodando na porta', app.info.port);

  return app;
}

module.exports = main();
