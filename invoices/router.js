'use strict'

const express = require('express')
const invoiceRouter = express.Router()
const passport = require('passport')
const {Customer} = require('../models')
const {Invoice} = require('../models')
const jwtAuth = passport.authenticate('jwt', {session: false});

//body parser
invoiceRouter.use(express.json())

invoiceRouter.get("/", jwtAuth, (req, res)=>{
    
})

invoiceRouter.post("/", jwtAuth, (req, res)=>{
    const requiredFields = ["customer", "items"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).json({message: `"${field}" is missing`})
        }
    }

    Customer.findOne({'userName': req.user.userName, 'companyName': req.body.customer})
    .then(customer=>{
        console.info(req.body.customer, req.user.userName)
        const now = new Date()
        const invNumber = Math.random().toString().substr(2,3)+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+now.getFullYear().toString()
        Invoice.create({
            customer: req.body.customer,
            invoiceNumber: invNumber,
            generateDate: Date.now(),
            items: req.body.items
        }, (err,invoice)=>{
            if (err) {
                res.status(400).json({message: `something wrong`})
            }
            else {
                res.status(201).json({"message": `invoice created`, "invoice": invoice, "user": req.user, "customer": customer})
            }
        })
    }
    )
    // //generate invoice number with 3 digit random number + data hour minute second and year
    // const now = new Date()
    // const invNumber = Math.random().toString().substr(2,3)+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+now.getFullYear().toString()
    // Invoice.create({
    //     customer: req.body.customer,
    //     invoiceNumber: invNumber,
    //     generateDate: Date.now(),
    //     items: req.body.items
    // }, (err,invoice)=>{
    //     if (err) {
    //         res.status(400).json({message: `something wrong`})
    //     }
    //     else {
    //         Customer.findOne({"companyName": req.body.customer, "userName": req.user.userName})
    //         .then(customer=>{
    //             if (customer) {
    //                 res.status(201).json({"message": `invoice created`, "invoice": invoice, "user": req.user, "customer": customer})
    //             }
    //             else {
    //                 res.status(400).json({message: `something wrong`})
    //             }
    //         })
    //     }
    // })
    // console.log(invNumber)
    // Invoice.findOne({"invoiceNumber": invNumber})
    // .then(invoice=>{
    //     console.log(invoice)
    //     if (invoice) {
    //         console.info(invoice)
    //         res.status(201).send(invoice)
    //     }
    //     else {
    //         console.info("none")
    //     }
    // })
    

})

module.exports = {invoiceRouter}