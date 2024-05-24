// Update with your config settings.
require('dotenv').config({path:"./.env"})
const {KNEX_USER, KNEX_PASSWORD, KNEX_URL, KNEX_DB_NAME} = process.env

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'rootroot',
      database: 'liftbookdb',
      charset: 'utf8',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: KNEX_URL,
      user: KNEX_USER,
      password: KNEX_PASSWORD,
      database: KNEX_DB_NAME,
      charset: 'utf8',
    },
  }
};
