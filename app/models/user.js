// load the things we need
var db = require('../../config/db');
var UserSchema = require('../schemas/user-schema');

var User = db.model('User', UserSchema);

// create the model for users and expose it to our app
module.exports = User;
