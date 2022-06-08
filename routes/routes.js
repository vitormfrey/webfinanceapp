const express = require("express");
const router = express.Router();
var knex = require("../database/knex");
const UserController = require("../controllers/UserController");
const AccountController = require("../controllers/AccountController");

//User routes
router.post("/api/createUser", UserController.CreateUser);
router.put("/api/updateUser", UserController.UpdateUser);
router.delete("/api/deleteUser", UserController.DeleteUser);
//Account routes
router.get("/api/getAccount", AccountController.GetAccount);
router.post("/api/createAccount", AccountController.CreateAccount);
router.put("/api/inactivateAccount", AccountController.InactivateAccount);

module.exports = router;
