const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
var knex = require("./database/kenx");
var todos = require("./routes/todosRoutes");

/**Configurações */
app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(router);

app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

app.get("/", todos);
