'use strict'

// hash password
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10)
}

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

UserSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
})

const CustomerSchema = mongoose.Schema({
    userName: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
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


CustomerSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
})

const User = mongoose.model("User", UserSchema);
const Customer = mongoose.model("Customer", CustomerSchema)
const Invoice = mongoose.model("Invoice", invoiceSchema)

module.exports = {User, Customer, Invoice};