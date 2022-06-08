var knex = require("../database/knex");
var helper = require("../Helper/helpers");
class UserController {
  async CreateUser(req, res, next) {
    const { name, email, password } = req.body;
    try {
      helper.isValid([name, email, password]);
      let query = await knex("users").where({ email: email }).limit(1);

      if (query.length > 0) throw new Error("Esse e-mail já está em uso");
    } catch (error) {
      return res.status(404).send({ success: false, error: error.message });
    }

    await knex
      .insert({ username: name, email: email, password: password })
      .into("users")
      .then((result) =>
        res.status(201).send({ success: true, message: "Usuário cadastrado" })
      )
      .catch((err) => {
        // TODO: Register error in DB
        res.status(500).send({
          success: false,
          message: "Internal error",
          code: err.message.code,
        });
      });
  }
  async UpdateUser(req, res, next) {
    const { id, name, email, password } = req.body;

    try {
      helper.isValid([id, name, email, password]);
      let query = await knex("users").where({ email: email }).limit(1);

      if (query.length > 0) throw new Error("Esse e-mail já está em uso");
    } catch (error) {
      return res.status(404).send({ success: false, error: error.message });
    }

    await knex("users")
      .update({ username: name, email: email, password: password })
      .update(" updated_at", knex.fn.now())
      .where("id", id)
      .then((result) =>
        res.status(200).send({ success: true, message: "Dados atualizados" })
      )
      .catch((err) => {
        // TODO: Register error in DB err.message and code
        res.status(500).send({
          success: false,
          message: "Internal error server",
          code: err.code,
        });
      });
  }
  async DeleteUser(req, res, next) {
    const { id } = req.body;
    try {
      helper.isValid([id]);
    } catch (error) {
      return res.status(404).send({ success: false, error: error.message });
    }

    await knex("users")
      .where("id", id)
      .del()
      .then((result) =>
        res.status(200).send({
          success: true,
          message: "User deleted, you will be redirected",
        })
      )
      .catch((err) => {
        // TODO: Register error in DB err.message and code
        res.status(500).send({
          success: false,
          message: "Internal error server",
          code: err.code,
        });
      });
  }
}

module.exports = new UserController();
