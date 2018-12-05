const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require("./config");
const morgan = require("morgan")

const {authRouter, localStrategy, jwtStrategy } = require('./auth');
const {usersRouter} = require('./users');

//passport and strategies
const passport = require('passport');
passport.use(localStrategy);
passport.use(jwtStrategy);

mongoose.Promise = global.Promise;

app.use(express.static("./public"))

//CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
});

// using morgan for server log
app.use(morgan('common'))

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/invoices', jwtAuth, (req, res) => {
    return res.json({
      data: 'rosebud'
    });
});

// A protected endpoint which needs a valid JWT to access it
app.get('/api/customers', jwtAuth, (req, res) => {
    return res.json({
      data: 'rosebud'
    });
});

//pending
// app.post("/invoices", (req, res) =>{
//     console.log(req.body)
//     return res.send(req.body)
// } )

//return 404 for non-existing pages
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
  });

// app.post("/customers", (req, res)=> {
//     const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "address"]
//     for (let field of requiredFields) {
//         if (!(field in req.body)) {
//             res.status(400).end()
//         }
//         if (!(req.body[field])) {
//             res.status(400).end()
//         }
//     }
//     Customer.findOne({"companyName" :req.body.companyName})
//     .then(function(customer) {
//         if (customer) {
//             res.status(400).json({message: `company "${req.body.companyName}" already exist in system`})
//         }
//         else {
//         Customer.create({
//             companyName: req.body.companyName || "",
//             firstName : req.body.firstName,
//             lastName: req.body.lastName,
//             phoneNumber: req.body.phoneNumber,
//             email: req.body.email,
//             address: {
//                 street: req.body.address.street,
//                 city: req.body.address.city,
//                 state: req.body.address.state,
//                 zipCode: req.body.address.zipCode
//             }
//         })
//     res.status(201).send(req.body)
//     }})
// })

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