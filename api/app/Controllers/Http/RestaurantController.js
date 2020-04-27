"use strict";

const Restaurant = use("App/Models/Restaurant");
const Env = use("Env");
const Mail = use("Mail");
const { validateAll } = use('Validator')
class RestaurantController {
  async index({ view, response }) {
    const data = await Restaurant.all();
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
    return view.render("restaurant", { restaurant: data.toJSON() });
  }
  async create({request,response,session}) {

    const v = await validateAll(request.all(), {
      'name': 'required|min:5|max:254',
      'social_reason': 'required|not_equals: name',
      'phone': 'required|max:20',
      'email': 'required|min:5|email|unique:restaurants,email',
      'secondary_email': 'email|min:5|different: email',
      'city': 'required|min:2',
      'state': 'required|min:2',
      'zipcode': 'required|min:8',
      'specialty': 'required',
      'delivery': 'boolean|min:1'
    })

    if(v.fails()){
      session.withErrors(v.messages()).flashExcept(['secondary_email', 'delivery'])
      return response.redirect('back')
    }

    const r = new Restaurant()

    r.name = request.input('name')
    r.social_reason = request.input('social_reason')
    r.phone = request.input('phone')
    r.email = request.input('email')
    r.city = request.input('city')
    r.state = request.input('state')
    r.zipcode = request.input('zipcode')
    r.specialty = request.input('specialty')
    r.delivery = request.input('delivery')

    await r.save()

    session.flash({ notification: 'Resraurant added! '})

  }
  async store({ request, response }) {
    const data = request.all();
    const existsEmail = await Restaurant.findBy("email", data.email);

    if (existsEmail)
      return response
        .status(400)
        .send({ message: { err: "Email already registered" } });
    try {
      const created = Restaurant.create(data);

      response.status(200).json({
        message: "Created",
        data: data,
      });
      return created;
    } catch (err) {
      response.status(400).json({
        message: "Error",
        data: err,
      });
    }
  }
  async update({ request, params }) {
    const id = await Restaurant.findOrFail(params.id);
    const data = request.all();

    id.merge(data);
    await id.save();
    return data;
  }
  async destroy({ params }) {
    const id = await Restaurant.findOrFail(params.id);
    return id.delete()
  }
}

module.exports = RestaurantController;
