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

// deslog
Route.group(() => {
  Route.post("/login", "SessionController.login"); // login
  Route.post("/register", "SessionController.register"); // register user
  Route.post("/crud", "SessionController.create"); // register user

  Route.get("/categories", "CategoryController.index");
  Route.get("/categories/:id", "CategoryController.show");
  Route.post("/categories", "CategoryController.store");
  Route.delete("/categories/:id", "CategoryController.destroy");
  Route.put("/categories/:id", "CategoryController.update");

  Route.get("/food", "FoodController.index");
  Route.post("/food", "FoodController.store");
  Route.get("/food/:id", "FoodController.show");
  Route.put("/food/:id", "FoodController.update");
  Route.delete("/food/:id", "FoodController.destroy");

  Route.get("/categoryFood/:id", "FoodController.categoryFood");
})
  .middleware(["guest"])
  .prefix("api/v1");

Route.get("/register", ({ view }) => {
  return view.render("register.register_user");
});

// log
Route.group(() => {
  Route.get("users/:id", "SessionController.show").middleware("auth"); // find user id specific
  Route.get("users", "SessionController.index").middleware("auth"); // find all users
  Route.get("/logout", "SessionController.logout"); // logout
})
  .middleware(["auth"])
  .prefix("api/v1");
