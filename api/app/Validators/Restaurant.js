'use strict'
const { formatters } = use('Validator')

class Restaurant {

  get formatter() {
    return formatters.JsonApi
  }
  get rules () {
    return {
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
    }
  }
  get messages() {
    return {
      'name.required': 'name field is required',
      'social_reason.required': 'social reason field is required',
      'phone.required': 'phone field is required',
      'email.required': 'email field is required',
      'city.required': 'city field is required',
      'state.required': 'state field is required',
      'zipcode.required': 'cep is required',
      'specialty.required': 'speciality is required',

      'email.unique': 'email exists in database',

      'email.email': 'email not valid',
      'email.secondary_email': 'secondary email not valid',

      'name.min': 'name must be at least 5 characters',
      'email.min': 'email must be at least 5 characters',
      'secondary_email.min': 'secondary_email must be at least 5 characters',
      'city.min': 'city must be at least 2 characters',
      'state.min': 'state must be at least 2 characters',
      'zipcode.min': 'zipcode must be at least 8 characters',
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Restaurant
