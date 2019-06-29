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

async function find(id) {
  if (id) {
    return db("games")
      .where({ id })
      .first();
  }
  return db("games");
}

// const execute = async () => {
//   try {
//     const data = await find();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// execute();

module.exports = {
  db
};
