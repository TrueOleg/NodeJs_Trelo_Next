import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// eslint-disable-next-line no-undef
describe("---Test users route---", () => {
  // eslint-disable-next-line no-undef
  it("it should GET /api/users/:id ", done => {
    const user = { id: 1 };
    chai
      .request(server)
      .get(`/api/users/${user.id}`)
      .end((err, res) => {
        console.log('res', res.body)
        res.should.have.status(200);
        res.body.user.should.have.property("login");
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it("it should GET /api/users", done => {
    chai
      .request(server)
      .get(`/api/users?page=1&per=5&sort=true`)
      .end((err, res) => {
          
        res.should.have.status(200);
        res.body.users[0].should.have.property("login");
        server.close();
        done();
      });
  });
});