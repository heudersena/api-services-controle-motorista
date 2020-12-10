const db = require("../database/knex");

class CondutorController {
  async listAll(req, res, next) {
    const condutores = await db("motoristas").select("*");

    res.status(200).json({ condutores });
  }

  async index(req, res, next) {
    const condutores = await db("motoristas")
      .select("*")
      .where({ processo_cnh: "ATIVA" })
      .where({ processo_cve: "ATIVA" })
      .where({ processo_bls: "ATIVA" })
      .innerJoin(
        "registros_cnh",
        "motoristas.id_cad_motorista",
        "=",
        "registros_cnh.id_cnh_cadastro_motorista"
      )
      .innerJoin(
        "registros_cve",
        "motoristas.id_cad_motorista",
        "=",
        "registros_cve.id_cve_cadastro_motorista"
      )
      .innerJoin(
        "registros_bls",
        "motoristas.id_cad_motorista",
        "=",
        "registros_bls.id_bls_cadastro_motorista"
      );
      
    res.status(200).json({ condutoresAtivos: condutores.length, condutores });
  }

  async store(req, res, next) {
    const { nome, matricula } = req.body;

    const response = await db("motoristas").insert({
      nome_completo: nome.toUpperCase().trim(),
      matricula: matricula,
    });
    console.log(response);

    if (response) {
      return res
        .status(200)
        .json({ message: "motorista cadastrado com sucesso", code: 200 });
    }
    return false;
  }

  async update(req, res, next) {}
  async delete(req, res, next) {}
}

module.exports = new CondutorController();
