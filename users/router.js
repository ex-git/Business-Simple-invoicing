'use strict'

const express = require('express');
const usersRouter = express.Router();

const {User, Customer, Invoice} = require('../models')

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
        if (!(field in req.body)) {
            res.status(400).end()
        }
    }
    if(req.body.password === "" || req.user.userName==="demo") {
        User.findByIdAndUpdate(req.user._id, {$set: {
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
            }})
            .then(user=>{
                //set cookie with JWT to expire 
                res.status(200).end()
            })
            .catch(
                err=>{
                    res.status(400).end()
                }
            )
    }
    else if(req.body.password) {
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
            .then(user=>{
                //set cookie with JWT to expire 
                res.status(200).end()
            })
            .catch(
                err=>{
                    res.status(400).end()
                }
            )
        })
    }
    
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

//Delete user and all data
usersRouter.delete("/deleteMe", jwtAuth, (req, res)=>{
    let user = req.user.userName
    if(req.user.userName=== "demo") {
        res.status(200).cookie('authToken', "", {maxAge: 0, httpOnly: true, sameSite: "lax"}).end()
    }
    else {
        User.deleteMany({userName: user})
        .then(()=>{
            return Invoice.deleteMany({userName: user})}
        )
        .then(()=>{
            return Customer.deleteMany({userName: user})}
        )
        .then(res.status(200).cookie('authToken', "", {maxAge: 0, httpOnly: true, sameSite: "lax"}).end()
        )
    } 
})

module.exports = {usersRouter}

