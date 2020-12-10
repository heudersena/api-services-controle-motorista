const db = require("../database/knex");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../private/data");

class SessionController {
  async create(req, res, next) {
    const { email, password } = req.body;
    const existeEmail = await db("usuarios").where({ email }).first();

    if (!existeEmail || existeEmail === "undefined") {
      return res.status(200).json({ errorCode:401, message: "e-mail não encontrado" });
    }

    const existePassword = await db("usuarios").where({ password }).first();

    if (!existePassword || existeEmail === "undefined") {
      return res.status(200).json({errorCode:401, message: "Senha incorreta." });
    }

    const userSerealize = {
      id_usuario: existeEmail.id_usuario,
      email: existeEmail.email,
    };
    const token = jwt.sign({ id: existeEmail.id_usuario }, JWT_KEY, {
      expiresIn: "8h",
    });

    res
      .status(200)
      .json({ id: existeEmail.id_usuario, email: existeEmail.email, token });
    next();
  }

  async clienteToken(req,res,next) {
    res.json({message : 'clienteToken'});
    next()
  }

}

module.exports = new SessionController();
