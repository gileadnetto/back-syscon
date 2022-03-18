// Update with your config settings.

const { db, password } = require('./.env');

// module.exports = {
//   client: 'postgresql',
//   connection: db,
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// };

// module.exports = {
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     database: 'papelaria',
//     user:     'root',
//     password
//   },
  
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }

// };

module.exports = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'ALTERDATA_IMMOBILE',
    user:     'postgres',
    password: '#abc123#',
  },
  searchPath: 'wcondominio',
  pool: {
    min: 2,
    max: 100
  },

};

