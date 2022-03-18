
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('produto', table => {
        table.string('ncm')
        table.string('ean')
        table.string('cest')
        table.string('marca')
        table.integer('Quantidade').notNull().defaultTo(0)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('produto', table => {
        table.dropColumn('ncm')
        table.dropColumn('ean')
        table.dropColumn('cest')
        table.dropColumn('marca')
        table.dropColumn('Quantidade')
    })
  
};
