
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: '123456789', make: 'Test', model: 'test', mileage: '123,456', transmissionType: 'test', titleStatus: 'test'},
      ]);
    });
};
