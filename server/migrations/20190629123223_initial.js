exports.up = async knex => {
  await knex.schema.createTable("games", tbl => {
    tbl.increments("id");
    tbl
      .string("title")
      .notNullable()
      .unique();
    tbl.string("genre").notNullable();
    tbl.integer("releaseYear");
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("games");
};
