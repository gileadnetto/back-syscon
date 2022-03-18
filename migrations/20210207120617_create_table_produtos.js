
exports.up = function(knex, Promise) {
  return knex.schema.createTable('produto', table => {
    table.string('id').primary().notNull()
    table.string('nome').notNull()
    table.string('detalhes')
    table.double('precoSugerido')
    table.string('criadoPor').references('id')
        .inTable('usuario')
    table.integer('status').notNull().defaultTo(1)
    table.dateTime('criadoEm').notNullable().defaultTo(knex.fn.now())
    
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('produto');

};
