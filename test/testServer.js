'use strict'

const {app, startServer, stopServer} = require("../server")
const chaiHttp = require("chai-http")
const chai = require("chai")


const expect = chai.expect;
chai.use(chaiHttp)


describe("Testing CRUD", function(){
    before (function(){
        return startServer()
    })
    after (function(){
        return stopServer()
    })
    describe("Testing on GET", function(){
        it("should get 200 status on GET", function(){
            return chai.request(app)
            .get("/")
            .then(function(res){
                expect(res).to.have.status(200)
            })
        })
    })
})
