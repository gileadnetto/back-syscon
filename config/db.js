const config = require('../knexfile.js');
const knex = require('knex')(config);

//aqui eu irei carregar(CRIAR) a tabela sempre que o sistema for inicializado
knex.migrate.latest([config]);

module.exports = knex;
