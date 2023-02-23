// docker exec -it mongodb \
//   mongo -u x0n4d0 -p 12345 --authenticationDatabase herois

// databases
// show dbs

// mudando o contexto para uma database
// use herois

// mostrar tables (coleções)
// show collections

// create
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998-01-01'
});

// read
db.herois.find().pretty();

// update
db.herois.update({ _id: ObjectId("62e1dcdc280894dad1a58f0c")}, { nome: 'Mulher Maravilha' });
// -- Sempre use o $set, se não utilizar os outros campos serão removidos, deixando apenas o nome e o id (CUIDADO!!)
// E se você errar o nome do campo, ele vai adicionar automaticamente, sem informar (CUIDADO!!);
db.herois.update({ _id: ObjectId("62e1dcdc280894dad1a58f0c")}, { $set: { nome: 'Lanterna Verde'} });

// O primeiro que tiver o poder = Velocidade, será alterado o poder para 'Super Força'
db.herois.update({ poder: 'Velocidade' }, { $set: { poder: 'Super Força'} });

// delete
db.herois.remove({}); // Remove todo mundo da base
db.herois.remove({ nome: 'Mulher Maravilha' });

db.herois.findOne();

db.herois.count();

db.herois.find().limit(1000).sort({ nome: -1 })

db.herois.find({}, { poder: 1, _id: 0 });
