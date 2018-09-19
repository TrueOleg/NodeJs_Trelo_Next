import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";
import db from "../models/index";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// beforeEach(done => {
//   db.sequelize
//     .sync({ force: true }) // drops table and re-creates it
//     .then(async () => {
//       await db.Users.create({
//         login: "Batman",
//         email: "1@gmail",
//         password: "1",
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//       });
//       await db.Users.create({
//         login: "Flash",
//         email: "1@gmail",
//         password: "1",
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//       });
//       await db.Boards.create({
//         title: "Board",
//         owner: 1,
//         owned: true,
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//       });
//       await db.Boards.create({
//         title: "BoardTwo",
//         owner: 2,
//         owned: true,
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//       });
//       await db.Shares.create({
//         board_id: 2,
//         user_id: 1
//       });
//       done();
//     })
//     .catch(error => {
//       done(error);
//     });
// });

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
