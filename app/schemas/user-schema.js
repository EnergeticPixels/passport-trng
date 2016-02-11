// load the things we need
var db = require('../../config/db');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var UserSchema = db.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

// methods
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password in valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = UserSchema;
