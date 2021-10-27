const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



passport.use(new LocalStrategy(

  {
    usernameField: "email"
  },

  (email, password, done) => {
   
    db.User.findOne({

      where: { email: email }
    }).then(userMatch => {

      if (!userMatch) { 
        console.log("incorrect email");
        return done(null, false, { message: 'Incorrect email.' }); 
      }
    
      if (!userMatch.verifyPassword(password)) { 
 
        console.log("incorrect password");
        return done(null, false, { message: 'Incorrect password.' }); 
      }
   
      console.log("correct email and password");
      return done (null, userMatch);
    }).catch(err => {
      return done(err);
    });
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id); 

});

passport.deserializeUser(function(id, done) {
  db.User.findOne({
    where: { id: id }
  }).then(user => {
    done(null, user);
  }).catch(err => done(err));
});


module.exports = passport;