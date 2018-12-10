'use strict'

const express = require('express');
const usersRouter = express.Router();

const {User} = require('../models')

//same as bodyParser
usersRouter.use(express.json())

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

