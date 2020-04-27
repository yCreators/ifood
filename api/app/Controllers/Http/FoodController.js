"use strict";
const Food = use("App/Models/Food");
const Database = use("Database");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with foods
 */
class FoodController {
  async index({ request, response, view }) {
    const data = await Food.all();
    return response.status(200).json({
      data: data,
    });
  }

  async store({ request, response }) {
    const data = request.all();
    try {
      Food.create(data);

      response.status(200).json({
        message: "Created",
        data: data,
      });
    } catch (err) {
      response.status(400).json({
        message: "Error",
        data: err,
      });
    }
  }

  async show({ params, request, response }) {
    const data = await Food.findOrFail(params.id);
    return response.status(200).json({
      data: data,
    });
  }

  async update({ params, request, response }) {
    const id = await Food.findOrFail(params.id);
    const data = request.all();

    id.merge(data);
    await id.save();
    return data;
  }

  async destroy({ params, request, response }) {
    const id = await Food.findOrFail(params.id);
    if (id.delete()) {
      return response.status(200).json({
        message: "Deletado com sucesso",
      });
    }
  }

  async categoryFood({ params, request, response }) {
    const data = await Database.table("foods").where("category_id", params.id);
    return response.status(200).json({
      data: data,
    });
  }
}

module.exports = FoodController;
