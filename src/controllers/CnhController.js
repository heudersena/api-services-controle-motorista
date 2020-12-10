const db = require("../database/knex");

class CnhController {
  async index(req, res, next) {
    try {
      const cnh = await db("registros_cnh")
        .where({ processo_cnh: "ATIVA" })
        .join(
          "motoristas",
          "registros_cnh.id_cnh_cadastro_motorista",
          "=",
          "motoristas.id_cad_motorista"
        );
      res.status(200).json({ cnh });
    } catch (error) {
      res.status(401).json({ message: "Ocorreu algum error.", error });
    }
  }
  async store(req, res, next) {
    const { id, dataCnh, numeroCnh } = req.body;

    const existeMotoristaId = await db("motoristas")
      .select("id_cad_motorista")
      .where({
        id_cad_motorista: id,
      })
      .first();
      
    if (!existeMotoristaId) {
      return res.status(200).json({
        type: "error",
        code: 401,
        message:
          "O motorista que você quer cadastrar esse registro, ainda não existe na nossa base de dados.",
      });
    }

    const responseExisteAtiva = await db("registros_cnh")
      .where({
        id_cnh_cadastro_motorista: id,
      })
      .where({
        processo_cnh: "ATIVA",
      })
      .first("processo_cnh");

    if (responseExisteAtiva) {
      return res.status(200).json({
        type: "error",
        code: 401,
        message: "Já existe uma CNH ativa para esse motorista.",
      });
    }

    const response = await db("registros_cnh").insert({
      id_cnh_cadastro_motorista: id,
      data_vencimento_cnh: dataCnh,
      numero_cnh: numeroCnh,
    });

    if (response) {
      return res.status(200).json({
        code: 200,
        type: "succes",
        message: "CNH cadastrada com sucesso.",
      });
    }

    return res.status(200).json({
      type: "error",
      code: 401,
      message: "Ocorreu algum error.",
    });
  }

  async get_register(req, res, next) {
    const { id } = req.body;

    const responseDataDB = await db("registros_cnh")
      .select("data_vencimento_cnh", "numero_cnh", "processo_cnh")
      .where({
        id_cnh_cadastro_motorista: id,
      });

    console.log(responseDataDB);

    return res.status(200).json({
      code: 200,
      type: "success",
      message: "Relatoria dos registro de CNH",
      dados: responseDataDB,
    });
  }

  async update(req, res, next) {}
  async delete(req, res, next) {}
}

module.exports = new CnhController();
