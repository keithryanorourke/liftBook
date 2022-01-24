/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('defaultexercises', (table) => {
      table.increments('id').primary().unique();
      table.string('name').notNullable().unique();
      table.string('muscle').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('defaultexercises')
};
