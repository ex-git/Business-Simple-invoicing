'use strict'

const {app, startServer, stopServer} = require("../server")
const chaiHttp = require("chai-http")
const chai = require("chai")
const faker = require("faker");


const {DATABASE_URL, TEST_DATABASE_URL} = require("../config")

const expect = chai.expect;
chai.use(chaiHttp)

function generateFakeUser() {
    return {
        companyName: faker.company.companyName(),
        userName: faker.internet.userName(),
        password: faker.internet.password(8),
        firstName : faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: Math.random().toString().slice(2,12),
        email: faker.internet.email(),
        address: {
            street: faker.address.streetAddress("###"),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipCode: faker.address.zipCode()
        }
    }
}

describe("Testing front end with GET", function(){
    before(function() {
        return startServer(TEST_DATABASE_URL)
    })
    after(function(){
        return stopServer()
    })
    describe("Testing on GET for home page", function(){
        it("should get 200 status on GET for home page", function(){
            return chai.request(app)
            .get("/")
            .then(function(res){
                expect(res).to.have.status(200)
            })
        })
    })
    describe("Testing on GET for non existing page", function(){
        it("should get 404 status on GET for non existing page", function(){
            return chai.request(app)
            .get("/nothingToSee")
            .then(function(res){
                expect(res).to.have.status(404)
            })
        })
    })
})

describe("Testing user endpoint", function(){
    before(function() {
        return startServer(TEST_DATABASE_URL)
    })
    after(function(){
        return stopServer()
    })
    describe("Testing on creating new user and login", function(){
        const newUser = generateFakeUser()
        it("should get 201 code when new user created", function(){
            return chai.request(app)
            .post("/api/users/newUser")
            .send(newUser)
            .then(function(res){
                expect(res).to.have.status(201)
            })
        })
        it("should get 200 code when login with new user ID and password", function(){
            //use chai agent to retain cookie
            const agent = chai.request.agent(app)
            return agent
            .post("/api/auth/login")
            .send({
                userName : newUser.userName,
                password : newUser.password
            })
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.have.cookie('authToken');
                return res
            })
            .then(function() {
                agent
                .get("/api/auth/logOut")
                .then(function(res){
                    expect(res).to.have.status(200)
                    agent.close()
                })
            })
            .then(function() {
                agent
                .get("/api/auth/refresh")
                .then(function(res){
                    expect(res).to.have.status(200)
                    agent.close()
                })
            })
        })
    })
})
