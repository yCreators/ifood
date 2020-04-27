"use strict";
const Category = use("App/Models/Category");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async index({ request, response, view }) {
    const data = await Category.all();
    return response.status(200).json({
      data: data,
    });
  }

  async store({ request, response }) {
    const data = request.all();
    try {
      const created = Category.create(data);

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
  async show({ params, request, response, view }) {
    const data = await Category.findOrFail(params.id);
    return response.status(200).json({
      data: data,
    });
  }

  async update({ params, request, response }) {
    const id = await Category.findOrFail(params.id);
    const data = request.all();

    id.merge(data);
    await id.save();
    return data;
  }

  async destroy({ params, request, response }) {
    const id = await Category.findOrFail(params.id);
    if (id.delete()) {
      return response.status(200).json({
        message: "Deletado com sucesso",
      });
    }
  }
}

module.exports = CategoryController;
