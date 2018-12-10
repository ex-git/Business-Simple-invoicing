'use strict'

// hash password
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

// bug fix for "DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead"
// without this findOneAndUpdate will not wrok
// credit: https://github.com/Automattic/mongoose/issues/6880#issuecomment-414151421
mongoose.set('useFindAndModify', false);

const UserSchema = mongoose.Schema({
    companyName: {type: String, required:true},
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    password: {type: String, required:true},
    userName: {type: String},
    phoneNumber: {type: String},
    email: {type: String},
    address: {
        street: String,
        city: String,
        state: String,
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
    userName: {type: String, required: true},
    companyName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zipCode: {type: String, required: true}
    }
})

CustomerSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
})

const InvoiceSchema = mongoose.Schema({
    customer: {type: String, required: true},
    invoiceNumber: {type: String, required: true},
    generateDate: {type: Number, required: true},
    items: [{item: String,
        charge: Number}]
})


const User = mongoose.model("User", UserSchema);
const Customer = mongoose.model("Customer", CustomerSchema)
const Invoice = mongoose.model("Invoice", InvoiceSchema)

module.exports = {User, Customer, Invoice};