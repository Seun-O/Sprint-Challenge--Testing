// Update with your config settings.

module.exports = {
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
