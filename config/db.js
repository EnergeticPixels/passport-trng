var db = require('mongoose');

// this connect can contain username/password right after the '//' as '//username:password/localhost...'
db.connect('mongodb://localhost:27017/pp-trng');

module.exports = db;
