import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

describe("---Test auth route---", () => {
  it("it should POST /api/auth/signUp", done => {
    const user = {
      regLogin: "sups",
      regPass: "1",
      regEmail: "sups@gmail.com"
    };
    chai
      .request(server)
      .post(`/api/auth/signUp`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });
  it("it should GET /api/auth/signIn", done => {
    chai
      .request(server)
      .get("/api/auth/signIn?login=sups&password=1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        server.close();
        done();
      });
  });
});