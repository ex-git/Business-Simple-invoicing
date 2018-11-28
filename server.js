const express = require("express")
const app = express()

app.use(express.static("./public"))

function startServer(DATABASEURL, port=8080) {
    return new Promise((resolve, reject)=>{
        app.listen(port, ()=> {
            console.log(`Your app is running at ${port}`)
        })
    })
}

if (require.main === module) {
    startServer().catch(error=>console.error(error))
}