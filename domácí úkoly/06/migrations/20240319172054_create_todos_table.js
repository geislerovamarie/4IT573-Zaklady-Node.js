
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => { // vytváři tabulku s todockama, tato fce je povinná
  await knex.schema.createTable("todos", (table) =>{
    table.increments("id").primary();   // data typ increments=auto, primary key
    table.string("title")
    table.boolean("done")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => { // maže tabulku s todockama
  await knex.schema.dropTable("todos")
};
