const passport = require('passport');
const User = require('../auth/user');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const user = require('../auth/user');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email , password , done){
        User.findOne({email}).then(user=>{
            if(user.password){
                bcrypt.compare(password , user.password , function(err, result){
                    if(err){ return done(err)}
                    if(result){return done(null, user)}
                });
            }else{
                return done('Пользователь не найден')
            }
        }).catch(e =>{
            return done(e)
        })
    }
));

passport.use(new GoogleStrategy({
    clientID: '422770337765-nbd5ck3e6msnqcu8ge4qgsupqovda3me.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid' , 'email' , 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value,
    }).save()
    return cb(null, newUser);
  }
));

passport.use(new GitHubStrategy({
    clientID: '1bd8b1af230004b50743',
    clientSecret: '96b0bc0c6927f58ce9c43741c3fcd9a6dd0603e6',
    callbackURL: "http://localhost:8000/api/auth/GitHub",
    // scope: [ 'email' ]  ?
     scope: ['openid' , 'email' , 'profile'] 
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ githubId: profile.id })
    console.log(user);
    const newUser = await new User({
         githubId: profile.id,
        //  full_name: profile.displayName, // ?
        //  email: profile.emails[0].value,  // ?
    }).save()
    return done(null, newUser);
  }
));



passport.serializeUser(function(user, done){
    done(null, user._id)
});
passport.deserializeUser(function(id, done){
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})