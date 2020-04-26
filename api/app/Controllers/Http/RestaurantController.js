'use strict'

const Restaurant = use('App/Models/Restaurant')
const Env = use('Env')
const Mail = use('Mail')
class RestaurantController {

  async index({ view, response }) {
    const data = await Restaurant.all()
    // const filtered = await Restaurant.query().where('id','=',2).orderBy('name').firstOrFail()
    // const email = `${Env.get('EMAIL_TEST')}`

    // try{
    //   await Mail.send('email_restaurant', filtered.toJSON(), m => {
    //     m.to('vitor.brother17@outlook.com.br').from(email).subject('Você foi cadastrado na plataforma | iFood Jaguaré')
    //   })
    //   return response.status(200).json({
    //     success: `Parabéns ${filtered.name}. Você foi cadastrado`,
    //     data: filtered
    //   })
    // }
    // catch(error){
    //   return response.send({
    //     error: 'Error sending the e-mail'
    //   })
    // }
    return view.render('restaurant', {restaurant: data.toJSON()})
  }
  async store ({ request, response, }) {
    const data = request.all()
    const existsEmail = await Restaurant.findBy('email', data.email)

    if(existsEmail)
      return response.status(400).send({ message: { err: 'Email already registered'}})
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
