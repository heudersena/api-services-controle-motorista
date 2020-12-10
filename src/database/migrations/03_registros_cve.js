exports.up = function (knex) {
  return knex.schema.createTable("registros_cve", function (t) {
    t.increments("id_cve").unsigned().primary();
    t.integer("id_cve_cadastro_motorista")
      .unsigned()
      .references("motoristas.id_cad_motorista");
    t.string("data_vencimento_cve");
    t.string("numero_cve");
    t.enum("processo_cve", ["ATIVA", "INATIVA"]).defaultTo("ATIVA");
    t.timestamp("created_at_cve").defaultTo(knex.fn.now());
    t.timestamp("updated_at_cve").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("registros_cve");
};
