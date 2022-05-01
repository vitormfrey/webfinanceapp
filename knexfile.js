// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "finance",
      user: "postgres",
      password: "teste",
    },
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
  },
};
