/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary().unique();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('mode').notNullable();
      table.boolean('trackDifficulty').notNullable();
      table.string('preferredMetric').notNullable();
      table.boolean('trackPercentageOfMax').notNullable();
    })
    .createTable('exercises', (table) => {
      table.increments('id').notNullable;
      table.string('name').notNullable().unique();
      table.string('muscle').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('workouts', (table) => {
      table.increments('id').notNullable();
      table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
      table.string('name');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('lifts', (table) => {
      table.increments('id').primary();
      table
        .integer('exercise_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('exercises')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('weight').unsigned().notNullable();
      table.string('measure').notNullable();
      table.integer('reps').unsigned().notNullable();
      table.float('difficulty').unsigned().notNullable();
      table.string('metric').notNullable();
      table.float('percentageOfMax').unsigned().notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('lifts').dropTable('exercises').dropTable('workouts').dropTable('users')
};

