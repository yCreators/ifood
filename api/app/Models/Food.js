"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Food extends Model {
  static get table() {
    return "foods";
  }
  static get primaryKey() {
    return "id";
  }
  static get connection() {
    return "mysql";
  }
  static get createdAtColumn() {
    return "created_at";
  }
  static get updatedAtColumn() {
    return "updated_at";
  }
}

module.exports = Food;
