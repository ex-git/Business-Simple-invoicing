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

function generateFakeCustomer(){
    return {
        companyName: faker.company.companyName(),
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

function generateFakeInvoice() {
    return {
        invoiceNumber: Math.random().toString().slice(2,12),
        generateDate: "1/1/2018",
        items: {
            item: faker.company.catchPhrase(),
            charge: Math.random().toString().slice(2,4)
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
    describe("Testing CRUD on user endpoint", function(){
        const newUser = generateFakeUser()
        it("should get 201 code when new user created", function(){
            return chai.request(app)
            .post("/api/users/newUser")
            .send(newUser)
            .then(function(res){
                expect(res).to.have.status(201)
            })
        })
        it("should have correct status response from user endpoint for CRUD", function(){
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
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                return agent
                .put("/api/users/editUser")
                .send(newUser)
                .then(function(res){
                    expect(res).to.have.status(200)
                    return agent
                    .post("/api/auth/login")
                    .send({
                        userName : newUser.userName,
                        password : newUser.password
                    })
                    .then(function(){
                        return agent
                        .delete("/api/users/deleteMe")
                        .then(function(res){
                            expect(res).to.have.status(200)
                            return agent
                            .get("/api/auth/refresh")
                            .then(function(res){
                                expect(res).to.have.status(401)
                                agent.close()
                            })
                        })
                    }) 
                })
            })
        })
    })
    describe("Testing CRUD on customer endpoint", function(){
        const newUser = generateFakeUser()
        const newCustomer = generateFakeCustomer()
        it("should get 201 code when new user created", function(){
            return chai.request(app)
            .post("/api/users/newUser")
            .send(newUser)
            .then(function(res){
                expect(res).to.have.status(201)
            })
        })
        it("should have correct status response from customer endpoint for CRUD", function(){
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
                return agent
                .get("/api/customers/find")
                .then(function(res){
                    expect(res).to.have.status(404)
                    return agent
                    .post("/api/customers")
                    .send(newCustomer)
                    .then(function(res){
                        expect(res).to.have.status(201)
                        expect(res).to.be.json
                        expect(res.body).to.be.a("object");
                        return agent
                        .get("/api/customers")
                        .then(function(res){
                            expect(res).to.have.status(200)
                            expect(res).to.be.json
                            newCustomer._id = res.body.ids[0]
                            return agent
                            .put("/api/customers")
                            .send(newCustomer)
                            .then(function(res){
                                expect(res).to.have.status(201)
                                return agent
                                .delete(`/api/customers/delete?id=${res.body.customer._id}`)
                                .then(function(res){
                                    expect(res).to.have.status(200)
                                    return agent
                                    .delete("/api/users/deleteMe")
                                    .then(function(res){
                                        expect(res).to.have.status(200)
                                        return agent
                                        .get("/api/auth/refresh")
                                        .then(function(res){
                                            expect(res).to.have.status(401)
                                            agent.close()
                                        })
                                    })
                                })
                            })
                        })
                    })
                }) 
            })
        })
    })
    describe("Testing CRUD on invoice endpoint", function(){
        const newUser = generateFakeUser()
        const newCustomer = generateFakeCustomer()
        const newInvoice = generateFakeInvoice()
        it("should get 201 code when new user created", function(){
            return chai.request(app)
            .post("/api/users/newUser")
            .send(newUser)
            .then(function(res){
                expect(res).to.have.status(201)
            })
        })
        it("should have correct status response from invoice endpoint", function(){
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
                return agent
                .get("/api/customers/find")
                .then(function(res){
                    expect(res).to.have.status(404)
                    return agent
                    .post("/api/customers")
                    .send(newCustomer)
                    .then(function(res){
                        expect(res).to.have.status(201)
                        expect(res).to.be.json
                        expect(res.body).to.be.a("object");
                        return agent
                        .get("/api/customers")
                        .then(function(res){
                            expect(res).to.have.status(200)
                            expect(res).to.be.json
                            newInvoice.customer = res.body.ids[0]
                            return agent
                            .post("/api/invoices")
                            .send(newInvoice)
                            .then(function(res){
                                expect(res).to.have.status(201)
                                return agent
                                .delete(`/api/customers/delete?id=${res.body.customer._id}`)
                                .then(function(res){
                                    expect(res).to.have.status(200)
                                    return agent
                                    .delete("/api/users/deleteMe")
                                    .then(function(res){
                                        expect(res).to.have.status(200)
                                        return agent
                                        .get("/api/auth/refresh")
                                        .then(function(res){
                                            expect(res).to.have.status(401)        
                                            agent.close()         
                                        })
                                    })
                                })
                            })
                        })
                    }) 
                })
            })
        })
    })
})