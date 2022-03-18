
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('usuario', table => {
        table.timestamp('deletadoEm')
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('usuario', table => {
        table.dropColumn('deletadoEm')
    })
};
