'use strict'

const Parse = require('parse/node')

// Get Configuration
const Config = require('../Config')

// Parse Initialization
Parse.initialize( Config.appId )
Parse.serverURL = Config.serverUrl

module.exports = Parse