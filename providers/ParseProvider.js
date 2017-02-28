'use strict'
const Ioc = require('adonis-fold').Ioc
const ServiceProvider = require('adonis-fold').ServiceProvider

class ParseProvider extends ServiceProvider {

  * register () { 
  
    this._bindParse()
    this._bindAuth()
    this._bindMiddleware()

  }

  _bindParse() {

    this.app.singleton('Codedigest/Src/Parse', (app) => {
        const Parse = require('../src/Parse')
        return Parse
    })

  }

  _bindAuth() {

    this.app.bind('Codedigest/Src/Auth', (app) => {
        const Auth = require('../src/Auth')
        return new Auth()
    })

  }

  _bindMiddleware() {

    this.app.bind('Codedigest/Middleware/SignedIn', function (app) {

      const SignedIn = require('../middleware/SignedIn')
      return new SignedIn()

    })

  }

  * boot () { 
    
    // Create Alias to Parse
    Ioc.alias('Parse', 'Codedigest/Src/Parse')
    Ioc.alias('Auth', 'Codedigest/Src/Auth')
    
    // add named middleware
    this._addNamedMiddleware()
    // add global middleware
    this._addGlobalMiddleware()

  }

  _addGlobalMiddleware() {
      const Middleware = this.app.use('Adonis/Src/Middleware')
  }

  _addNamedMiddleware() {
    
    const Middleware = this.app.use('Adonis/Src/Middleware')
    Middleware.register('SignedIn', 'Codedigest/Middleware/SignedIn')

  }

}

module.exports = ParseProvider