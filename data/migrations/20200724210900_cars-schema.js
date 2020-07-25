const { table } = require("../db-config");

exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.string('VIN').unique().notNullable();
    tbl.text('make').notNullable();
    tbl.text('model').notNullable();
    tbl.float('mileage').notNullable();
    tbl.text('transmissionType');
    tbl.text('titleStatus');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};
