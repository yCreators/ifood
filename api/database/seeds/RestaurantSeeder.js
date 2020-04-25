'use strict'

/*
|--------------------------------------------------------------------------
| RestaurantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RestaurantSeeder {
  async run () {
    await Factory.model('App/Models/Restaurant').create(1)
  }
}

module.exports = RestaurantSeeder
