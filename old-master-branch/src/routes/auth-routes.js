const Joi = require('joi');
const Boom = require('@hapi/boom');
const Jwt = require('jsonwebtoken');

const BaseRoute = require("./base/base-route");

const PasswordHelper = require('../helpers/password-helper');

const failAction = (request, headers, error) => {
  throw error;
}

const USER = {
  username: 'xuxadasilva',
  passowrd: '123'
}

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      options: {
        // Informações do Swagger Automatizado!
        // tags: ['api'],
        // description: 'Get token',
        // notes: 'Make login with user and password',
        auth: false,
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password:Joi.string().required()
          }
        }
      },
      handler: async (request) => {
        const { username, password } = request.payload;

        const [ user ] = await this.db.read({
          username: username.toLowerCase()
        });

        if (!user) {
          return Boom.unauthorized('User not founded!');
        }

        const match = await PasswordHelper.compare(password, user.passowrd);

        if (!match) {
          return Boom.unauthorized('Incorrect user or password!');
        }

        // if (username.toLowerCase() !== USER.username || password !== USER.passowrd) {
        //   return Boom.unauthorized();
        // }

        const token = Jwt.sign({
          username: username,
          id: user.id
        }, this.secret);

        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes;
