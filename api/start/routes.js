"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
Route.resource("restaurant", "RestaurantController")
  .apiOnly()
  .validator(new Map([[["restaurant.store"], ["Restaurant"]]]));

Route.get('restaurant', ({ view }) => {
  return view.render('restaurant')
})

// deslog
Route.group(() => {
  Route.post("/login", "SessionController.login"); // login
  Route.post("/register", "SessionController.register"); // register user
})
  .middleware(["guest"])
  .prefix("api/v1");

// log
Route.group(() => {
  Route.get("users/:id", "SessionController.show").middleware("auth"); // find user id
  Route.get("/logout", "SessionController.logout"); // logout
})
  .middleware(["auth"])
  .prefix("api/v1");
