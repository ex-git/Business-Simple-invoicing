const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require("./config");
const morgan = require("morgan")

const {authRouter, localStrategy, jwtStrategy } = require('./auth');
const {usersRouter} = require('./users');
const {customerRouter} = require('./customers')
const {invoiceRouter} = require('./invoices')

//passport and strategies
const passport = require('passport');
passport.use(localStrategy);
passport.use(jwtStrategy);

//parser JWT from header
const cookieParser = require('cookie-parser')
app.use(cookieParser())

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
app.use('/api/customers', customerRouter)
app.use('/api/invoices', invoiceRouter)

app.use(express.json());


//return 404 for non-existing pages
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
});

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