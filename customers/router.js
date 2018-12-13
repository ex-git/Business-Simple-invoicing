'use strict'

const express = require('express')
const customerRouter = express.Router()
const passport = require('passport')
const {Invoice, Customer} = require('../models')

//same as bodyParser
customerRouter.use(express.json());

const jwtAuth = passport.authenticate('jwt', { session: false });

customerRouter.get("/", jwtAuth, (req, res)=>{
    Customer.find({userName: req.user.userName})
    .then(customers=>{
        if (customers.length > 0) {
            const companyName = customers.map(customer=>customer.companyName)
            const customerName = customers.map(customer=>customer.fullName)
            const customerID = customers.map(customer=>customer._id)
            res.status(200).json({companies: companyName, customers: customerName, ids: customerID})
        }
        else {
            res.status(404).json({message: "No customer found"})
        }
    })
})

customerRouter.get("/find", jwtAuth, (req, res)=>{
    const queryName = Object.keys(req.query)[0]
    Customer.findById(req.query[queryName])
    .then(customer=>{
        {if (customer) {
            res.status(200).json({"message": `customer found`, "user": req.user, "customer": customer})
        }
        else {
            res.status(404).json({"message": `Nothing found, please try something else`})
        }
    }})
})

customerRouter.post("/", jwtAuth, (req, res)=>{
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "address"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).json({message: `"${field}" is missing`})
        }
    }
    const customerFullName = `${req.body.firstName} ${req.body.lastName}`;
    Customer.findOne({companyName: req.body.companyName, userName: req.user.userName, firstName: req.body.firstName, lastName: req.body.lastName})
    .then(customer => {
        if (customer) {
            res.status(400).json({message: `Customer "${customerFullName}" with "${req.body.companyName}" already exist in system`})
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

customerRouter.put("/", jwtAuth, (req, res)=>{
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "address", "_id"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).json({message: `"${field}" is missing`})
        }
    }
    const updateInfo = {
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
    Customer.findByIdAndUpdate(req.body._id, {$set:updateInfo}, {new: true},(err,customer)=>{
        if (err) {
            res.status(400).json({message: `something wrong`})
        }
        else {
            res.status(201).json({"message": `customer info updated`, "user": req.user, "customer": customer})
        }
    })
})

customerRouter.delete("/delete", jwtAuth, (req, res)=>{
    const queryName = Object.keys(req.query)[0]
    Invoice.deleteMany({customer: req.query[queryName]})
    .then(()=>{
        Customer.findByIdAndDelete(req.query[queryName])
        .then(()=>{
            res.status(200).json({"message": `customer and all invoices associated to that customer have been deleted`})
        })
    })
})

module.exports = {customerRouter}