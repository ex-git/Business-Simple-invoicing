'use strict'

const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const authRouter = express.Router()
const {JWT_SECRET, JWT_EXPIRY} = require('../config')
const {User} = require('../models')

//same as bodyParser
authRouter.use(express.json());

//create token using algorithm HS256
const createAuthToken = function(userName) {
    return jwt.sign({userName}, JWT_SECRET, {
      subject: userName,
      expiresIn: JWT_EXPIRY,
      algorithm: 'HS256'
    });
};


const localAuth = passport.authenticate('local', {session: false});

// User provides a username and password to login
authRouter.post('/login', (req, res) => {
  if (!(req.body.userName && req.body.password)) {
      res.status(400).end()
  }
  else {
      User.findOne({"userName": req.body.userName})
      .then(user=>{
          if (!user) {
              return Promise.reject({
                  reason: 'LoginError',
                  message: 'Incorrect username or password'
              });
          }
          return user.validatePassword(req.body.password)
      })
      .then(valid=>{
        if (!valid) {
              console.info("login attempt with incorrect username or password")
              return Promise.reject({
                  reason: 'LoginError',
                  message: 'Incorrect username or password'
              });
        }
        //create and send token when login is valid
        const authToken = createAuthToken(req.body.userName);
        res.status(200).json({authToken});
      })
      .catch(err=>{
          if (err.reason === 'LoginError') {
              res.status(400).json(err)
          }
      })
  }
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
authRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.status(200).json({authToken});
});

module.exports = {authRouter};