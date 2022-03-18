
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('produto', table => {
        table.string('imagem')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('produto', table => {
        table.dropColumn('imagem')
    })
};
