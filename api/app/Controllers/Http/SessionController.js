"use strict";

const User = use("App/Models/User");

class SessionController {

  async index({ view }) {
    const data = await User.all()
    return view.render('all', {users: data.toJSON() } )
  }
  async register({ request, response }) {
    let user = await User.create(request.all());
    const existsEmail = await User.findBy('email', user.email)

    if(existsEmail)
      return response.status(400).send({ message: { err: `${data.email} already registered` }})
    else
      return response.json(user);
  }

  async create({request,response}) {
    let username = request.input('username')
    let email = request.input('email')
    let password = request.input('password')

    const created = new User()
    created.name = username,
    contact.email = email,
    contact.password = password,

    await created.save()
    return response.json(created)
  }
  async login({ auth, request, response, view }) {
    const { email, password } = request.all();
    try {
      let result = await auth.attempt(email, password);
      return view.render('login', { login: result.toJSON() });
    } catch (error) {
      let errorUser = error.message.startsWith("E_USER_NOT_FOUND");
      let errorPass = error.message.startsWith("E_PASSWORD_MISMATCH");
      let info = { type: "another", message: error.message };

      if (errorUser) {
        info = { type: "user", message: "E_USER_NOT_FOUND" };
      } else if (errorPass) {
        info = { type: "pass", message: "E_PASSWORD_MISMATCH" };
      }
      return response.status(403).send(info);
    }
  }
  async show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "Usuário com id diferente do parametro";
    }
    return auth.user;
  }

  async logout({ response, auth }) {
    try {
      const isLogeddin = await auth.check();
      if (isLogeddin) {
        await auth.logout();
      }
      return response.status(401).send({ alert: "Desconect" });
    } catch (error) {
      response.status(401).send({ alert: "NOT_LOGGEDED" });
    }
  }
}

module.exports = SessionController;
