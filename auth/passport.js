//passport

//  same as
// const { Strategy: LocalStrategy } = require('passport-local');
const LocalStrategy = require("passport-local").Strategy;

const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const {JWT_SECRET} = require('../config')
const {User, Customer} = require("../models");

const localStrategy = new LocalStrategy((userName, password, callback)=>{
    let validUser;
    User.findOne({userName: userName})
    .then(user=>{
        if (!user) {
            return Promise.reject({
                reason: 'LoginError',
                message: 'Incorrect username or password'
            })
        validUser = user;
        return user.validatePassword(password)
        }
    })
    .then(valid=>{
        if(!valid) {
            return Promise.reject({
                reason: 'LoginError',
                message: 'Incorrect username or password'
            })
        }
        return callback(null, validUser)
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});
  
const jwtStrategy = new JWTStrategy({
    secretOrKey: JWT_SECRET,
    // Look for the JWT as a Bearer auth header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    // HS256 tokens - same as the one we issue
    algorithms: ['HS256']
    },
    (payload, done) => {
    done(null, payload.user);
    }
);

module.exports = { localStrategy, jwtStrategy };