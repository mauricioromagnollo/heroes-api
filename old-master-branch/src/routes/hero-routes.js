const Joi = require('joi');
const Boom = require('@hapi/boom');

const BaseRoute = require("./base/base-route");

const failAction = (request, headers, error) => {
  throw error;
}

const headers = Joi.object({
  authorization: Joi.string().required()
}).unknown()

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      options: {
        validate: {
          failAction,
          query: {
              skip: Joi.number().integer().default(0),
              limit: Joi.number().integer().default(10),
              nome: Joi.string().min(3).max(100)
          },
          headers
        }
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;
          const query = {
            nome: {
              $regex: `.*${nome}*.`
            }
          };

          return this.db.read( nome ? query : {}, skip, limit);
        } catch (error) {
          console.log('Deu Ruim', error);
          return Boom.internal();
        }
      }
    }
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      options: {
        validate: {
          failAction,
          headers,
          payload: {
              nome: Joi.string().required().min(3).max(100),
              poder: Joi.string().required().min(2).max(50)
            }
        }
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: "Heroi cadastrado com sucesso!",
            _id: result._id
          }
        } catch (error) {
          console.log('Deu ruim', error);
          return Boom.internal();
        }
      }
    }
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      options: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
          headers,
          payload: {
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(50)
          }
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;

          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);

          const result = await this.db.update(id, dados);

          if (result.modifiedCount !== 1) {
            return Boom.preconditionFailed('Id não encontrado no banco!');
          }

          return {
            message: 'Heroi atualizado com sucesso!'
          }

        } catch (error) {
          console.error('Deu ruim', error);
          return Boom.internal();
        }
      }
    }
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      options: {
        validate: {
          failAction,
          headers,
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const resultado = await this.db.delete(id);

          if (resultado.deletedCount !== 1) {
            return Boom.preconditionFailed('Id não encontrado no banco!');
          }

          return {
            message: 'Heroi Removido com Sucesso'
          }
        } catch(error) {
          console.error('DEU RUIM', error);
          return Boom.internal();
        }
      }
    }
  }
}

module.exports = HeroRoutes;
