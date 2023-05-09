var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'valenteG12',
      database : 'knex_api'
    }
  });

module.exports = knex