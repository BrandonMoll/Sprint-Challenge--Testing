
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'Asteroids', genre: 'Arcade'},
        {title: 'Rocket League', genre: 'Online Multiplayer'}
      ]);
    });
};
