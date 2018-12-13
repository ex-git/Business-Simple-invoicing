'use strict'

const express = require('express')
const invoiceRouter = express.Router()
const passport = require('passport')
const {Customer, Invoice} = require('../models')
const jwtAuth = passport.authenticate('jwt', {session: false});

//body parser
invoiceRouter.use(express.json())

invoiceRouter.get("/", jwtAuth, (req, res)=>{
    const queryName = Object.keys(req.query)[0]
    if (queryName === "customer") {
        Customer.findOne({companyName:req.query[queryName]})
        .then(customer=>{
            Invoice.find({[queryName]: customer._id, 'userName': req.user.userName}, {_id:0})
            .then(invoice=>{
                if(invoice.length>0) {
                    Customer.findById(invoice[0].customer)
                    .then(customer =>
                        {if (customer) {
                            res.status(200).json({"message": `invoice(s) found`, "invoices": invoice, "user": req.user, "customer": customer})
                        }
                        else {
                            res.status(404).end()
                        }}
                    )
                }
                else {
                    res.status(404).json({"message": `Nothing found, please try something else`})
                }
            })
        })
    }
    else {
        Invoice.find({[queryName]: req.query[queryName], 'userName': req.user.userName}, {_id:0})
        .then(invoice=>{
            if(invoice.length>0) {
                Customer.findById(invoice[0].customer)
                .then(customer =>
                    {if (customer) {
                        res.status(200).json({"message": `invoice(s) found`, "invoices": invoice, "user": req.user, "customer": customer})
                    }
                    else {
                        res.status(404).end()
                    }}
                )
            }
            else {
                res.status(404).json({"message": `Nothing found, please try something else`})
            }
        })
    }
})

invoiceRouter.post("/", jwtAuth, (req, res)=>{
    const requiredFields = ["customer", "items", "generateDate"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).json({message: `"${field}" is missing`})
        }
    }

    Customer.findById(req.body.customer)
    .then(customer=>{
        const now = new Date()
        const invNumber = Math.random().toString().substr(2,3)+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+now.getFullYear().toString()
        Invoice.create({
            userName: req.user.userName,
            customer: req.body.customer,
            invoiceNumber: invNumber,
            generateDate: req.body.generateDate,
            items: req.body.items
        }, (err,invoice)=>{
            if (err) {
                res.status(400).json({message: `something wrong`})
            }
            else {

                res.status(201).json({"message": `invoice created`, "invoices": [invoice], "user": req.user, "customer": customer})
            }
        })
    }
    )
})

invoiceRouter.put("/", jwtAuth, (req, res)=>{
    const requiredFields = ["customer", "items", "generateDate", "invoiceNumber"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).json({message: `"${field}" is missing`})
        }
    }
    Customer.findById(req.body.customer)
    .then(customer=>{
        Invoice.findOneAndUpdate({'invoiceNumber': req.body.invoiceNumber}, {$set:{
            userName: req.user.userName,
            customer: req.body.customer,
            invoiceNumber: req.body.invoiceNumber,
            generateDate: req.body.generateDate,
            items: req.body.items
            }}, {new: true},(err,invoice)=>{
                if (err) {
                    res.status(400).json({message: `something wrong`})
                }
                else {
                    res.status(201).json({"message": `invoice created`, "invoices": [invoice], "user": req.user, "customer": customer})
                }
            }
        )
    })    
})

invoiceRouter.delete("/", jwtAuth, (req, res)=>{
    const queryName = Object.keys(req.query)[0]
    Invoice.findOneAndDelete({[queryName]: req.query[queryName], 'userName': req.user.userName}, {_id:0})
    .then(invoice=>{
        res.status(200).json({"message": `invoice deleted`})
    })
})

module.exports = {invoiceRouter}