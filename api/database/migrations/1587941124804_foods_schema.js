"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FoodsSchema extends Schema {
  up() {
    this.create("foods", (table) => {
      table.increments();
      table.string("name");
      table.double("value");
      table.text("description");
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories");
      table
        .integer("restaurants_id")
        .unsigned()
        .references("id")
        .inTable("restaurants");
      table.timestamps();
    });
  }

  down() {
    this.drop("foods");
  }
}

module.exports = FoodsSchema;
