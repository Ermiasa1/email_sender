const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'    
    },
     (accesToken, refreshToken, profile, done) =>{ 
        console.log("accessToken:" + " " + accesToken);        
        console.log("refreshToken:", refreshToken);
        console.log("profile:",  profile);

    }
    )
);
app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000
app.listen(5000)