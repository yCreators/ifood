'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')

Factory.blueprint('App/Models/Restaurant', f => {
  // metodos para gerar factory [ seed ] https://chancejs.com/
  return {
    social_reason: 'Iago e Elaine Entregas Expressas ME',
    name: f.name({ nationality: 'en' }),
    phone: f.phone(),
    email: f.email({ domain: 'gmail.com'}),
    secondary_email: f.email({ domain: 'gmail.com'}),
    city: f.city(),
    state: f.state(),
    zipcode: f.zip({ plusfour: true }),
    complement: f.sentence({words: 5}),
    specialty: 'Brasileira',
    delivery: f.bool()
  }
})
