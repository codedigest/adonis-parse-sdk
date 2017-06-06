# adonis-parse-sdk

JavaScript Parse SDK wrapper for Adonis JS

## Install

```bash
npm install adonis-parse-sdk --save
```

## Usage

Create a file in `app/config/parseSdk.js` and paste the code below by replacing it's values where necessary:

```javascript
'use strict'

/*
 |--------------------------------------------------------------------------
 | Parse Configuration
 |--------------------------------------------------------------------------
 |
 | Here we define the configuration for the parse server.
 |
 */

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | Parse Application ID
   |--------------------------------------------------------------------------
   |
   | Define the same application ID as the one specified in the parse server
   | appId: 'Your-parse-app-ID',
   */
  appId: null,

  /*
   |--------------------------------------------------------------------------
   | Parse Javascript key
   |--------------------------------------------------------------------------
   | javaScriptKey: 'Your-parse-javaScript-key'
   */
  javaScriptKey: null,

  /*
   |--------------------------------------------------------------------------
   | Parse Javascript key
   |--------------------------------------------------------------------------
   | masterKey: 'Your-parse-master-key',
   */
  masterKey: null,

  /*
   |--------------------------------------------------------------------------
   | Parse Server URL
   |--------------------------------------------------------------------------
   |
   | Define the parse URL: e.g. https://domain.com:4040/parse
   | serverUrl: 'Your-parse-server-URL',
   |
   */
  serverUrl: null,

}
```

Also you need to add the provider to AdonisJS at `app/bootstrap/app.js`:

```javascript
const providers = [
   ...
   'adonis-parse-sdk/providers/ParseProvider'
]
```

then you can simply call it from within controllers etc:

```javascript
const Parse = use('Parse')
```

## [Example] User SignUp and SignIn

Add to one of your controllers. e.g. LoginController:

```javascript
'use strict'
const Parse = use('Parse')

class LoginController {

    * signup(request, response) {

        // Sign UP
        var user = new Parse.User();

        user.set("username", request.input('reg_email'));
        user.set("password", request.input('reg_password'));
        user.set("email", request.input('reg_email'));

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            console.log('registered')
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
          }
        });
        
    }
    
    * signin(request, response) {
        
        /*
            Sign In
        */
        Parse.User.logIn(request.input('email'), request.input('password'), {
          success: function(user) {

            var sessionToken = user.getSessionToken()
            
            // Needs to be enabled, otherwise Parse.User.become does not work
            Parse.User.enableUnsafeCurrentUser();
            // Do stuff after successful login.
            Parse.User.become(sessionToken).then(function (user) {
                // The current user is now set to user.
                console.log('Signed-in')
                
                return response.route('home')

            }, function (error) {
                // The token could not be validated.
                alert("Error: " + error.code + " " + error.message);
            });

          },
          error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Error: " + error.code + " " + error.message);
          }
        });
        
    }
}
```
