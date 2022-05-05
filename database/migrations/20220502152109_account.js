/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments("id").primary();
    table.text("description").notNullable();
    table.text("yn_active").notNullable();
    table.integer("user_id").notNullable().references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
