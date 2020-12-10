exports.up = function (knex) {
  return knex.schema.createTable("registros_bls", function (t) {
    t.increments("id_bls").unsigned().primary();
    t.integer("id_bls_cadastro_motorista")
      .unsigned()
      .references("motoristas.id_cad_motorista");
    t.string("data_vencimento_bls");
    t.string("numero_bls");
    t.enum("processo_bls", ["ATIVA", "INATIVA"]).defaultTo("ATIVA");
    t.timestamp("created_at_bls").defaultTo(knex.fn.now());
    t.timestamp("updated_at_bls").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("registros_bls");
};
