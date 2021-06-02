// Most of the syntax for the test was gathered here: https://www.chaijs.com/api/bdd/#method_property

var expect = require("chai").expect;
var request = require("request");
var foodList = require("../app/server.js");
var app = 'http://localhost:3001';
var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe("Code Test", function () {
    describe("Random number test", function () {
        var url = "http://localhost:3001/random";
        it("returns status 200", function (done) {
            request(url, function (error, res) {
                //Expects the status code of the response to be 200 and nothing else
                expect(res.statusCode).to.equal(200);
                done();
            })
        });

        it("returns JSON format", function (done) {
            request(url, function (error, res) {
                //Expects the body of the response
                expect(JSON.parse(res.body)).to.be.an('object')
                /* The 'expect' syntax below works similarly to the above one in the way that the response body need to be a Json and that it needs to be an object
                expect(JSON.parse(body)).to.have.property('number');
                */
                done();
            })
        });

        it("returns a random number between 0 and 1023", function (done) {
            request(url, function (error, res) {
                expect(JSON.parse(res.body).number).to.be.above(-1).and.to.be.below(1024);
                done();
            })
        });
    });

    describe("Random costum number test", function () {
        var url = "http://localhost:3001/random/200";
        it("returns status 200", function (done) {
            request(url, function (error, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        });

        it("returns JSON format", function (done) {
            request(url, function (error, res) {
                expect(JSON.parse(res.body)).to.be.an('object')
                done();
            })
        });

        it("returns a random number between 0 and the parameter given by the user", function (done) {
            request(url, function (error, res) {
                expect(JSON.parse(res.body).number).to.be.above(-1).and.to.be.below(201);
                done();
            })
        });
    });

    describe("Getting the foodlist test", function () {
        var url = "http://localhost:3001/food_list";
        it("returns status 200", function (done) {
            request(url, function (error, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        });

        it("returns JSON format", function (done) {
            request(url, function (error, res) {
                expect(JSON.parse(res.body)).to.be.an('object')
                /* The 'expect' syntax below works similarly to the above one in the way that the response body need to be a Json and that it needs to be an object
                expect(JSON.parse(body)).to.have.property('number');
                */
                done();
            })
        });

        it("returns the actuall food list", function (done) {
            request(url, function (error, res) {
                expect(JSON.parse(res.body)).to.be.deep.equal({ 'list': foodList});
                done();
            })
        });

    });

    //Link for where I found how to test 'post' requests: https://stackoverflow.com/a/37154078
    describe("Adding to the food list", function () {
        it("returns status 200", function (done) {
            chai.request(app)
            .post('/add_food')
            //Send any food item
            .send({
                name: "Ice cream",
                taste: "Cold"
            })
            .end(function (error, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });   
        });

        it("Checks if the response is an object that is not empty (returns JSON format)", function (done) {
            chai.request(app)
            .post('/add_food')
            //Send any food item
            .send({
                name: "Ice cream",
                taste: "Cold"
            })
            .end(function (error, res) {
                expect(res.body).to.be.an('object').and.to.include.key('message')
                done();
            });
        });

        it("returns 'false message' if food already exist on list", function (done) {
            chai.request(app)
            .post('/add_food')
            //Sends food that already exist on the list
            .send({
                name: 'Bacon',
                taste: 'Delicious'
            })
            .end(function (error, res) {
                expect(res.body).to.deep.equal({
                    success: false,
                    message: "That food is alredy on the list"
                })
                done();
            });
        });

        it("returns 'true message' if food does not already exist on list", function (done) {
            chai.request(app)
            .post('/add_food')
            //Sends food that does not exist on the list
            .send({
                name: 'Chips',
                taste: 'Crunchy'
            })
            .end(function (error, res) {
                expect(res.body).to.deep.equal({
                    success: true,
                    message: "Added food to list"
                  })
                done();
            });
        });

    });

});