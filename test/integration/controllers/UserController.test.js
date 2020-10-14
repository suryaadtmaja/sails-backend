const { expect } = require("chai");
var request = require("supertest");

describe("User Signup", () => {

  describe("POST /signup", () => {
    it("should respond to json", (done) => {
      request(sails.hooks.http.app)
      .post("/signup")
      .set("Accept", "application/json")
      .send({
        "email": "verysecure@mail.com",
        "password": "password",
        "fullName": "hehehe"
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {return done(err);}
        expect(res.body.email).to.be.equal("verysecure@mail.com");
        res.body.should.have.property("email", "verysecure@mail.com");
        return done();
      });
    });
  });
});

describe("User Login", () => {
  describe("POST /login", () => {
    it("Should respond to json & get jwt token", (done) => {
      request(sails.hooks.http.app).post("/login").set("Accept", "application/json").send({
        "email": "verysecure@mail.com",
        "password": "password"
      }).expect("Content-Type", /json/).expect(200).end((err, res) => {
        if (err) { return done(err);}
        res.body.should.have.property("token");
        return done();
      });
    });
  });
});
