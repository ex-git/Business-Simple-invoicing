'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    companyName: {type: String, require},
    firstName: {type: String, require},
    lastName: {type: String, require},
    password: {type: String, require},
    userName: {type: String},
    phoneNumber: {type: String},
    email: {type: String},
    address: {
        street: String,
        city: String,
        State: String,
        zipCode: String,
    }
})

const customerSchema = mongoose.Schema({
    companyName: {type: String},
    firstName: {type: String, require},
    lastName: {type: String, require},
    phoneNumber: {type: String},
    email: {type: String},
    address: {
        street: String,
        city: String,
        State: String,
        zipCode: String,
    }
})

const invoiceSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: "customer"},
    items: [{item: String,
    charge: Number}]
})

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
})

customerSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
})

const User = mongoose.model("User", userSchema);
const Customer = mongoose.model("Customer", userSchema)
const Invoice = mongoose.model("Invoice", invoiceSchema)

module.exports = {User, Customer, Invoice};