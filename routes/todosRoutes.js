var express = require("express");
var router = express.Router();
var knex = require("../database/kenx");

router.get("/", function (req, res, next) {
  knex.raw("SELECT now() ").then(function (todos) {
    res.send(todos.rows);
  });
});

module.exports = router;
