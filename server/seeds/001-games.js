exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("games")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        { title: "Pacman", genre: "Arcade", releaseYear: "1980" }
      ]);
    });
};
