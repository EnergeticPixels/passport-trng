module.exports = function(app, passport) {
    // =============================
    // home page (with login links) ==
    // =============================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =============================
    // LOGIN =======================
    // =============================
    // show the login forms
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
    // process the login forms
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // =============================
    // SIGNUP ======================
    // =============================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage') });
    });
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back tot he signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =============================
    // PROFILE SECTION =============
    // =============================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log('inside the get profile route');
        res.render('profile.ejs', {user: req.user // get the user out of the session and pass it to template
        });
    });

    // =============================
    // LOGOUT ======================
    // =============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they arent redirect them to the home page
    res.redirect('/');
}
