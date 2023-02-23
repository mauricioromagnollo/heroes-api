# Multi Database Project

## PostgreSQL

```bash
docker run --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=heroes -p 5432:5432 -d postgres
```

```bash
docker exec -it postgres /bin/bash
```

```bash
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer
```

## MongoDB

```bash
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4
```

```bash
docker run --name mongo-client -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
```

```bash
docker exec -it mongodb mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({ user: 'x0n4d0', pwd: '12345', roles: [{role: 'readWrite', db: 'herois'}]})"
```



## Padrão RESTful

- Stateless (Token);
- Dados de cliente são armazenados em seus respectivos navegadores;
- Em geral, retorna JSON;
- Padrões de URL:
  GET /heroes
  GET /heroes/:id
  GET /heroes/:id/headquarters
  POST /heroes
  PUT /heroes/:id -> body: {name, date, power}
  PATCH /heroes/:id -> body: {name}
  DELETE /heroes/:id

## Query String
http://localhost:5000/herois?skip=0&limit=10&nome=Flash


## Aprendizados

- Padrão de Projeto (Strategy) para trabalhar com múltiplos bancos;
- Pagination
- Validação de Requisição

## Techs

- PostgreSQL
- MongoDB
- Sequelize - ORM
- [hapi.js](https://hapi.dev/) - Server Framework
- [joi.js](https://joi.dev/) - Schema Validator
- [jsonwebtoken]
- [bcrypt]
- [dotenv]
- [pm2]
- [istanbul]




## Todo List

- [] Alterar variáveis para Inglês;
- [] Adicionar arquivos do Docker (Dockerfile e docker-compose.yml);
- [] Adicionar ESLint e Prettier;
- [] Documentação (README);
- [] Adicionar collection do insomnia (insomnia-collection.json);
- [] Atualizar a versão do Hapi e do Joi;
- [] Fazer o Happi Swagger funcionar (Corrigir a versão do Joi): (Módulo 10 do curso)
  - [hapi-swagger]()
  - [vision]
  - [inert]



## Padrão JSON Web Token

- API envia um Token para acesso aos serviços;
- Cliente envia este token via headers;
- A cada request este token é validado;
- Refresh Token;
