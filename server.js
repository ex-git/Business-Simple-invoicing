const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require("./config");
const {User, Customer} = require("./models")

mongoose.Promise = global.Promise;

app.use(express.static("./public"))

//same as bodyParser
app.use(express.json());

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