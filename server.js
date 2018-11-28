const express = require("express")
const app = express()
const {PORT} = require("./config")
app.use(express.static("./public"))

function startServer(port=PORT) {
    return new Promise((resolve, reject)=>{
        app.listen(port, ()=> {
            console.log(`Your app is running at ${port}`)
        })
    })
}

function stopServer() {
    app.close()
}

if (require.main === module) {
    startServer().catch(error=>console.error(error))
}

module.exports = {app, startServer, stopServer}