'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {type: String, require},
    lastName: {type: String, require},
    password: {type: String, require},
    userName: {type: String},
    companyName: {type: String, require},
    address: {
        street: String,
        city: String,
        State: String,
        zipCode: String,
        phoneNumber: Number,
    }
})

const customerSchema = mongoose.Schema({
    firstName: {type: String, require},
    lastName: {type: String, require},
    address: {
        street: String,
        city: String,
        State: String,
        zipCode: String,
        phoneNumber: Number,
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