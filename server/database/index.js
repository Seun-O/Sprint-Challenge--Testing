const knex = require("knex");

const config = {
  development: {
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
  }
};
const db = knex(config);

module.exports = {
  db
};
