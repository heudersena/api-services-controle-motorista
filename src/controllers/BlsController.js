const db = require("../database/knex");

// t.string("data_vencimento_bls");
// t.string("numero_bls");

class BlsController {

  async store(req, res, next) {
    const { id, dataBls, numeroBls } = req.body;
    
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

    const responseExisteAtiva = await db("registros_bls")
      .where(
        {
          id_bls_cadastro_motorista: id,
        }
      ).where(
        {
          processo_bls: "ATIVA"
        }
        )
      .first("processo_bls");

    if(responseExisteAtiva) {
      return res.status(200).json({
        type: "error",
        code: 401,
        message: "Já existe uma BLS ativa para esse motorista.",
      });
    }
    const response = await db("registros_bls")
      .insert({
        id_bls_cadastro_motorista: id,
        data_vencimento_bls: dataBls,
        numero_bls: numeroBls,
      })
      .returning("*");
    if (response) {
      return res.status(200).json({
        type: "success",
        code: 200,
        message: "Registro cadastrado com succeso.",
      })
    }else {
      return res.status(200).json({
        type: "error",
        code: 401,
        message: "Ocorreu algum errro ao tentar cadastrar.",
      })
    }
  } // fim store

  async get_register(req,res,next) {
    const {id} = req.body;

    const responseDataDB = await db("registros_bls")
      .select("data_vencimento_bls", "numero_bls", "processo_bls")
      .where({
        id_bls_cadastro_motorista: id,
      });

    console.log(responseDataDB);

    return res.status(200).json({
      code: 200,
      type: "success",
      message: "Relatoria dos registro de bls",
      dados: responseDataDB,
    });

  }
}

module.exports = new BlsController();
