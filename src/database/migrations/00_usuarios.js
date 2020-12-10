exports.up = function (knex) {
  return knex.schema.createTable("usuarios", function (t) {
    t.increments("id_usuario").unsigned().primary();
    t.string("name").notNull();
    t.string("email").notNull().unique();
    t.string("password").notNull();
    t.timestamp("created_at_usuario").defaultTo(knex.fn.now());
    t.timestamp("updated_at_usuario").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
