const knex = require("knex");

const config = {
  client: "postgresql",
  connection: {
    database: "challengedb"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
const db = knex(config);

function find(id) {
  if (id) {
    return db("games")
      .where({ id })
      .first();
  }
  return db("games");
}

function addGame(game) {
  return db("games")
    .insert(game)
    .returning("*");
}

function delGame(id) {
  return db("games")
    .where({ id })
    .del();
}

function getByName(name) {
  return db("games")
    .where({ title: name })
    .first();
}

// const execute = async () => {
//   try {
//     const data = await getByName("Pacman");
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// execute();

module.exports = {
  db,
  find,
  addGame,
  delGame,
  getByName
};
