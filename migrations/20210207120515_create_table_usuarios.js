
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuario', table =>{
        table.string('id').primary().notNull()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuario');
};
