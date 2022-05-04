const express = require("express");
const router = express.Router();
var knex = require("../database/knex");
const UserController = require("../controllers/UserController");

//User routes
router.post("/api/createUser", UserController.createUser);
router.put("/api/updateUser", UserController.updateUser);

module.exports = router;
