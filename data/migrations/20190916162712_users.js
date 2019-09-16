
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.string('username', 32).notNullable().unique();
            tbl.string('password', 32).notNullable();
        });
};

exports.down = function(knex) {
  
};
