'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantSchema extends Schema {
  up () {
    this.create('restaurants', (table) => {
      table.increments()
      table.string('social_reason').notNullable()
      table.string('name').notNullable()
      table.string('phone', 20).notNullable()
      table.string('email').unique().notNullable()
      table.string('secondary_email')
      table.string('city', 160).notNullable()
      table.string('state', 4).notNullable()
      table.string('zipcode', 12).notNullable()
      table.string('complement', 80)
      table.enu('specialty',['Brasileira', 'Chinesa', 'Americana', 'Outras']).comment('Especialidade do restaurante')
      table.boolean('delivery').notNullable().default(true).comment('Faz delivery?')
      table.timestamps()
    })
  }

  down () {
    this.drop('restaurants')
  }
}

module.exports = RestaurantSchema
