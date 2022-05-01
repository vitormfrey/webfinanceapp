const connection = require("../database/connection");
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
router
  // Rotas usuário.
  .post("/api/createUser", UserController.newUser)
  .put("/api/updateUser", UserController.UpdateUser)
  .post("/api/login", UserController.login)
  .get("/api/getInfos", UserController.getInfos);

module.exports = router;
