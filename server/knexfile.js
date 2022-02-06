// Update with your config settings.
require('dotenv').config({path:"./.env"})
const {KNEX_USER, KNEX_PASSWORD} = process.env

console.log(process.env)

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: KNEX_USER,
      password: KNEX_PASSWORD,
      database: 'liftbookdb',
      charset: 'utf8',
    },
  },
};
