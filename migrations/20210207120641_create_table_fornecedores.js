
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fornecedor', table => {
        table.string('id').primary().notNull()
        table.string('nome').notNull()
        table.string('detalhes')
        table.integer('status').notNull().defaultTo(1)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fornecedor');
};
