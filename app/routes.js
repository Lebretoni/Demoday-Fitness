const mongoose = require('mongoose');
const Meal = require('./models/meals.js');

module.exports = function (app, passport, ObjectId, db) {
  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('users').find().toArray((err, result) => {

    console.log(req.user.local.numberOfDaysToGetToGoalWeight);
    res.render('profile.ejs', {
      user: req.user,
    });
    })
  });

  app.get('/plan', isLoggedIn, function (req, res) {
    res.render('plan.ejs');
  });

  // app.get('/images', isLoggedIn, function(req, res) {
  //     res.render('images.ejs');
  // });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // ==========================================
  // Goal weight submition to get Goal Calories to eat
  // ==========================================

  app.post('/goalWeight', isLoggedIn, (req, res) => {
    db.collection('users').findOneAndUpdate(
      { _id: ObjectId(req.user._id) },
      {
        $set: {
          'local.goalWeight': parseInt(req.body.goalWeight),
          'local.numberOfDaysToGetToGoalWeight' : parseInt(req.body.numberOfDaysToGetToGoalWeight)
        },
      },
      { returnOriginal: false, upsert: true },
      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
        // res.redirect('/profile')
      }
    );
  });

  app.get('/meals', isLoggedIn, function (req, res) {
    db.collection('users').find().toArray((err, result) => {
      let userId = req.user._id
      // console.log(userId + ' User id')

      Meal.find({ userId: userId}, (err, meals) => {
        console.log(meals)
        // console.log(typeof meals[0].calories)
          res.render('meals', {
              user: req.user,
              meals: meals
          })
      })
      })
  });

  app.post('/enterMeal', isLoggedIn, (req, res) => {
    const calories = parseFloat(req.body.calories);
    const meal = req.body.meal;
    // console.log(meal)
    // console.log(req.body.userId)
    const newMeal = new Meal({
      email: req.user.local.email,
      date: req.body.date,
      meal: meal,
      calories: calories,
      userId: ObjectId(req.body.userId)
    });
    newMeal
      .save()
      .then(() => res.redirect('/meals'))
      .catch((err) => console.log(err));
  });

  app.delete('/deleteMeal', (req, res) => {
  Meal.findOneAndDelete({_id: req.body._id,  meal: req.body.meal}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

  // message board routes ===============================================================

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/');
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
