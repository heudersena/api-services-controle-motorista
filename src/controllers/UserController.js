const db = require("../database/knex");

class UserController {
  async index(req, res, next) {
    const users = await db("usuarios").select("*");
    req.io.emit("listUsers", users);
    res.status(200).json({ users });
    next();
  }
  async store(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await db("usuarios").insert({
        name: email,
        email,
        password,
      });
      if (user) {
        req.io.emit("listUsers", user);
        return res.status(200).json({ user });
      }
    } catch (error) {
      if (error) {
        return res.status(401).json({ message: error.sqlMessage, error });
      }
    }
    next();
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await db("usuarios").where({ id_usuario: id }).del();
      if (user) {
        res.status(200).json({ message: "Usuário deletado com sucesso." });
      } else {
        res.status(401).json({ message: "Ops! usuário não encontrado." });
      }
    } catch (error) {
      res
        .status(401)
        .json({ message: "Ops! ocorreu algum error.", error, type: "catch" });
    }

    next();
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const user = await db("usuarios").where({ id_usuario: id }).update({
        email,
      });
      if (user) {
        res.status(200).json({ message: "Usuário atualziado com sucesso." });
      } else {
        res.status(401).json({ message: "Ops! usuário não aualizado." });
      }
    } catch (error) {
      res
        .status(401)
        .json({ message: "Ops! não atualizado.", error, type: "catch" });
    }
    return next();
  }
}

module.exports = new UserController();
