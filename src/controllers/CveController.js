const db = require("../database/knex");
class CveController {
  async store(req, res) {
    const { id, dataCve, numeroCve } = req.body;

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

    const responseExisteAtiva = await db("registros_cve")
      .where(
        {
          id_cve_cadastro_motorista: id,
        }
      ).where(
        { 
          processo_cve: "ATIVA" 
        }
        )
      .first("processo_cve");

    if(responseExisteAtiva) {
      return res.status(200).json({
        type: "error",
        code: 401,
        message: "Já existe uma CVE ativa para esse motorista.",
      });
    }

    const response = await db("registros_cve").insert({
      id_cve_cadastro_motorista: id,
      data_vencimento_cve: dataCve,
      numero_cve: numeroCve,
    });
    if (response) {
      return res.status(200).json({
        type: "success",
        code: 200,
        message: "Registro cadastrado com succeso.",
      });
    } else {
      return res.status(200).json({
        type: "error",
        code: 401,
        message: "Ocorreu algum errro ao tentar cadastrar.",
      });
    }
  }
  // 
  async get_register(req,res,next) {
    const {id} = req.body;

    const responseDataDB = await db("registros_cve")
      .select("data_vencimento_cve", "numero_cve", "processo_cve")
      .where({
        id_cve_cadastro_motorista: id,
      });

    console.log(responseDataDB);

    return res.status(200).json({
      code: 200,
      type: "success",
      message: "Relatoria dos registro de cve",
      dados: responseDataDB,
    });

  }
  // 
}

module.exports = new CveController();
