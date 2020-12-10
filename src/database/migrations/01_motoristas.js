exports.up = function (knex) {
  return knex.schema.createTable("motoristas", function (t) {
    t.increments("id_cad_motorista").unsigned().primary();
    t.string("nome_completo").notNull();
    t.string("matricula").notNull().unique();
    t.timestamp("created_at_motorista").defaultTo(knex.fn.now());
    t.timestamp("updated_at_motorista").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("motoristas");
};
