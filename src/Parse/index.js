'use strict'

const ParseSDK = require('parse/node')

class Parse {

  initialize(appId, serverUrl, optionalJSKey, masterKey) {
    ParseSDK.initialize(appId, optionalJSKey, masterKey)
    ParseSDK.serverURL = serverUrl
    return ParseSDK
  }

}

module.exports = new Parse
