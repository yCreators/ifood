'use strict'

const Restaurant = use('App/Models/Restaurant')
class RestaurantController {

  async index({ view }) {
    const data = await Restaurant.all()
    return view.render('restaurant', {restaurant: data.toJSON()})
  }
  async store ({ request, response, }) {
    const data = request.all()
    try {
      const created = Restaurant.create(data)

      response.status(200).json({
        message: 'Created',
        data: data
      })
      return created
    }
    catch(err) {
      response.status(400).json({
        message: 'Error',
        data: err
      })
    }
  }
  async update({ request, params }) {
    const id = await Restaurant.findOrFail(params.id)
    const data = request.all()

    id.merge(data)
    await id.save()
    return data
  }
  async destroy({params}) {
    const id = await Restaurant.findOrFail(params.id)
      return id.delete()
  }
}

module.exports = RestaurantController
