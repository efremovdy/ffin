var faker = require('faker');
var database = { users: [], documents: [] };

for (var i = 1; i <= 3; i++) {
  database.users.push({
    id: i,
    username: i === 1 ? 'ivanov' : faker.name.lastName(),
    password: i === 1 ? 'ivanov' : faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: i === 1 ? 'Ivanov' : faker.name.lastName()
  });
}

for (var i = 1; i <= 20; i++) {
  var randomUser = database.users[faker.random.number(2)];
  database.documents.push({
    id: i,
    header: faker.lorem.words(2),
    content: faker.lorem.sentences(3),
    approver: randomUser.name,
    resolution: '',
    comment: '',
    state: ''
  });
}

console.log(JSON.stringify(database));
