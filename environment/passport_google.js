const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const config = require('../environment/config');
const User = require('../models/user');


passport.serializeUser((user,done)=>{
    console.log('Serializing User',user);
    done(null,user.user.id);
})

passport.deserializeUser((id,done)=>{
    User.getUserById(id,(err,user)=>{
        console.log('Serializing User',user);
        done(null,user);
    })
    
})
passport.use(new GoogleStrategy({
    clientID:config.google_oauth2.ClientID,
    clientSecret:config.google_oauth2.ClientSecret,
    callbackURL:'/users/google/oauth2callback'
},(token,tokenSecret,profile,done)=>{
    // console.log(profile.emails + profile.username);
    let newUser = new User({
        name:profile.displayName,
        username:profile.username,
        email:profile.emails,
        googleid:profile.id
    });
    newUser.save((err,user)=>{
        if(err) throw err;
        const token = jwt.sign(user.toJSON(),config.mongodb.secret,{
            expiresIn:604800 //1 week
        });
        var resUserObj={
        success:true,
        token:'JWT ' + token,
        user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
        }
        };
        done(null,resUserObj);
    });
}))