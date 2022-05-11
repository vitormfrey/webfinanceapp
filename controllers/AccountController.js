var knex = require("../database/knex");
var helper = require("../Helper/helpers");

class AccountController {
  async CreateAccount(req, res, next) {
    const { user_id, description } = req.body;
    try {
      helper.isValid([user_id, description]);
      let accounts = await knex("account")
        .where("user_id", user_id)
        .andWhere("description", description)
        .limit(1);
      if (accounts.length > 0) {
        return res
          .status(409)
          .send({ success: false, message: "This account already exists." });
      }
    } catch (error) {
      return res.status(404).send({ success: false, error: error.message });
    }

    await knex
      .insert({ description: description, user_id: user_id, yn_active: "S" })
      .into("account")
      .then((result) =>
        res
          .status(201)
          .send({ success: true, message: `Registered account ${description}` })
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
  async GetAccount(req, res, next) {
    const { user_id } = req.body;

    await knex("account")
      .where("user_id", user_id)
      .andWhere("yn_active", "<>", "N")
      .then((result) => {
        result.length == 0
          ? res.status(404).send({
              success: false,
              message: "No accounts registered or active",
            })
          : res.status(200).send({ success: true, accounts: result });
      })
      .catch((err) => {
        // TODO: Register error in DB
        res.status(500).send({
          success: false,
          message: "Internal error",
          code: err.message.code,
        });
      });
  }
  async InactivateAccount(req, res, next) {
    const { user_id, id } = req.body;
    let balanceResult = {};
    const balance = await knex("balance").where("account_id", id).limit(1);

    // Check if balance is valid
    balanceResult = helper.containsBalance(balance);

    if (balanceResult.success)
      res.status(200).send({ success: true, accounts: balanceResult.message });
    else {
      await knex("account")
        .update("yn_active", "N")
        .where("id", id)
        .then((result) => {
          res
            .status(200)
            .send({ success: true, message: "Account inactivated" });
        })
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
}

module.exports = new AccountController();
