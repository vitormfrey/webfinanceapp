/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("balance", (table) => {
    table.increments("id").primary();
    table.decimal("value", 12, 2).notNullable();
    table
      .integer("account_id")
      .notNullable()
      .references("id")
      .inTable("account");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("balance");
};
