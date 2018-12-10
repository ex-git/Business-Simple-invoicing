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
authRouter.post('/login', localAuth, (req, res) => {
    const validUser = {address: req.user.address,
        companyName: req.user.companyName}
    const authToken = createAuthToken(req.user.userName);
    res.status(200).cookie('authToken', authToken, {maxAge: 600000, httpOnly: true, sameSite: "lax"}).json({validUser: validUser})
})

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
authRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  //send back cookie with 10 mins life with JWT
  res.status(200).cookie('authToken', authToken, {maxAge: 600000, httpOnly: true, sameSite: "lax"}).json({validUser: validUser})
});

module.exports = {authRouter};