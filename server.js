const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require("./config");
const {User, Customer} = require("./models");
const morgan = require("morgan")
const bcrypt = require('bcryptjs')

mongoose.Promise = global.Promise;

app.use(express.static("./public"))

// using morgan for server log
app.use(morgan('common'))

//same as bodyParser
app.use(express.json());

app.post("/invoices", (req, res) =>{
    console.log(req.body)
    return res.send(req.body)
} )

app.post("/users", (req, res)=>{
    if (!(req.body.userName && req.body.password)) {
        res.status(400).end()
    }
    else {
        User.findOne({"userName": req.body.userName, "password": req.body.password})
        .then(function(result){
            if (result) {
                res.status(200).end()
            }
            else {
                res.status(400).end()
            }
        })
    }
})

app.post("/newUser", (req, res)=>{
    const requiredFields = ["companyName", "firstName", "lastName", "phoneNumber", "email", "address", "userName", "password"]
    for (let field of requiredFields) {
        if (!(field in req.body) || !(req.body[field])) {
            console.log(field)
            res.status(400).end()
        }
    }
    User.create({
        companyName: req.body.companyName || "",
        userName: req.body.userName,
        password: req.body.password,
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
    res.status(201).end()
})

//check if user name and company name are already registered
app.get("/checkAvailability", (req, res)=>{
    if (req.headers.checkname && req.headers.checkvalue) {
        console.info(req.headers.checkname,req.headers.checkvalue)
        User.findOne({[req.headers.checkname] : req.headers.checkvalue})
        .then(function(result){
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


app.post("/customers", (req, res)=> {
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "address"]
    for (let field of requiredFields) {
        if (!(field in req.body)) {
            res.status(400).end()
        }
        if (!(req.body[field])) {
            res.status(400).end()
        }
    }
    Customer.findOne({"companyName" :req.body.companyName})
    .then(function(customer) {
        if (customer) {
            res.status(400).json({message: `company "${req.body.companyName}" already exist in system`})
        }
        else {
        Customer.create({
            companyName: req.body.companyName || "",
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
    res.status(201).send(req.body)
    }})
})

let server;

function startServer(databaseUrl=TEST_DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject)=>{
        mongoose.connect(databaseUrl, {useNewUrlParser: true}, anyErr=>{
            if (anyErr) {
                return reject(anyErr)
            };
            server = app
            .listen(port, ()=> {
                console.log(`Your app is running at ${port}`);
                resolve();
            })
            .on("error", err=>{
                mongoose.disconnect();
                reject(err);
            });
        })
    })
}

function stopServer() {
    return mongoose.disconnect()
    .then(()=>{
        return new Promise((resolve, reject)=>{
            console.log("Closing Server");
            server.close(err=>{
                if (err) {
                    return reject(err)
                }
                resolve();
            })
        })
    })
}

if (require.main === module) {
    startServer().catch(error=>console.error(error))
}

module.exports = {app, startServer, stopServer}