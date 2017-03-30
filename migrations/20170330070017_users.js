exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name', 255).notNullable().defaultTo('');
    table.string('last_name', 255).notNullable().defaultTo('');
    table.string('email', 255).notNullable().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.text('cover_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('users')
};
