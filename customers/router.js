'use strict'

const express = require('express')
const customerRouter = express.Router()
const passport = require('passport')
const {Customer} = require('../models')

//same as bodyParser
customerRouter.use(express.json());

const jwtAuth = passport.authenticate('jwt', { session: false });

customerRouter.get("/", jwtAuth, (req, res)=>{
    Customer.find({userName: req.user.userName})
    .then(customers=>{
        if (customers.length > 0) {
            const companyName = customers.map(customer=>customer.companyName)
            const customerName = customers.map(customer=>customer.fullName)
            res.status(200).json({companies: companyName, customers: customerName})
        }
    })
})

customerRouter.post("/", jwtAuth, (req, res)=>{
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "address"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).json({message: `"${field}" is missing`})
        }
    }
    const customerFullName = `${req.body.firstName} ${req.body.lastName}`;
    Customer.findOne({$or: [{phoneNumber: req.body.phoneNumber}, {email: req.body.email}, {companyName: req.body.companyName}]})
    .then(customer => {
        if (customer && customer.fullName === customerFullName) {
            res.status(400).json({message: `Customer "${customerFullName}" already exist in system`})
        }
        else {
        const newCustomer = {
            userName: req.user.userName,
            companyName: req.body.companyName,
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
        Customer.create(newCustomer)
        res.status(201).send(req.body)
    }})
})

module.exports = {customerRouter}