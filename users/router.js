'use strict'

const express = require('express');
const usersRouter = express.Router();

const {User} = require('../models')

//same as bodyParser
usersRouter.use(express.json())

const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {session: false});

usersRouter.post("/newUser", (req, res)=>{
    const requiredFields = ["companyName", "firstName", "lastName", "phoneNumber", "email", "address", "userName", "password"]
    for (let field of requiredFields) {
        if (!(field in req.body) || !(req.body[field])) {
            res.status(400).end()
        }
    }

    User.hashPassword(req.body.password)
    .then(hashPassword=> {
        User.create({
            companyName: req.body.companyName || "",
            userName: req.body.userName,
            password: hashPassword,
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                state: req.body.address.state,
                zipCode: req.body.address.zipCode
            }
        })
    })
    res.status(201).end()
})

usersRouter.get("/", jwtAuth, (req, res)=>{
    User.findOne({userName: req.user.userName})
    .then(user=>{
        res.send(user)
    })
})

usersRouter.put("/editUser", jwtAuth, (req, res)=>{
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "address", "password"]
    for (let field of requiredFields) {
        if (!(field in req.body) || !(req.body[field])) {
            res.status(400).end()
        }
    }
    if(req.body.password) {
        User.hashPassword(req.body.password)
        .then(hashPassword=> {
            User.findOneAndUpdate({userName:req.user.userName}, {$set: {
                password: hashPassword,
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zipCode: req.body.address.zipCode
                }
            }
            })
            .catch(
                err=>{console.info(err)}
            )
        })
    }
    // not working!!!!!!
    else if(req.body.password === "") {
        User.findOneAndUpdate({userName:req.user.userName}, {$set: {
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                state: req.body.address.state,
                zipCode: req.body.address.zipCode
            }
        }}, function(err, ok) {
            if(err){
                console.info(err)
               res.status(400).end()
            }
            else{
                console.info(ok);
            }
        })
    }
    
    //set cookie with JWT to expire 
    res.status(200).cookie('authToken', "", {maxAge: 0, httpOnly: true, sameSite: "lax"}).end()
})

//check if user name and company name are already registered
usersRouter.post("/checkAvailability", (req, res)=>{
    if (req.body.checkAvailability) {
        User.findOne({[req.body.checkAvailability.name]: req.body.checkAvailability.value})
        .then(result=> {
            console.info(result)
            if (result) {
                res.status(203).end()
            }
            else {
                res.status(200).end()
            }
        })
    }
    else {
        res.status(203).end()
    }
})


module.exports = {usersRouter}

