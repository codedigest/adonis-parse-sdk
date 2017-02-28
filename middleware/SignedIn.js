'use strict'
const Parse = use('Parse')

class SignedIn {

  * handle (request, response, next) {

    var currentUser = Parse.User.current()

    if ( !currentUser ) {
      response.route('login')
    }

    yield next
  }

}

module.exports = SignedIn