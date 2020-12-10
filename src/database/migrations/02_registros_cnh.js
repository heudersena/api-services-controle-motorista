exports.up = function (knex) {
  return knex.schema.createTable("registros_cnh", function (t) {
    t.increments("id_cnh").unsigned().primary();
    t.integer("id_cnh_cadastro_motorista")
      .unsigned()
      .references("motoristas.id_cad_motorista");
    t.string("data_vencimento_cnh");
    t.string("numero_cnh");
    t.enum("processo_cnh", ["ATIVA", "INATIVA"]).defaultTo("ATIVA");
    t.timestamp("created_at_cnh").defaultTo(knex.fn.now());
    t.timestamp("updated_at_cnh").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("registros_cnh");
};
