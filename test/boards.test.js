import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";
import db from "../models/index";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// await db.Users.create({
//   login: 'Flash',
//   email: '1@gmail',
//   password: "1",
//   createdAt: Date.now(),
//   updatedAt: Date.now()
// });
// await db.Users.create({
//     login: 'GreenArrow',
//     email: '2@gmail',
//     password: "1",
//     createdAt: Date.now(),
//     updatedAt: Date.now()
// });
// await db.Boards.create({
//     name: 'Board',
//     owner: 2,
//     owned: true,
//     createdAt: Date.now(),
//     updatedAt: Date.now()
// });
// await db.Boards.create({
//     name: 'BoardTwo',
//     owner: 1,
//     owned: true,
//     createdAt: Date.now(),
//     updatedAt: Date.now()
// });
// await db.Boards.create({
//     name: 'BoardTwo',
//     owner: 1,
//     owned: true,
//     createdAt: Date.now(),
//     updatedAt: Date.now()
// });
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

// eslint-disable-next-line no-undef
describe("---Test boards route---", () => {
  // beforeEach((done) => {

  //     db.sequelize.sync({ force: true }) // drops table and re-creates it
  //         .then(async () => {

  //             done();
  //         })
  //         .catch((error) => {
  //             done(error);
  //         });
  // });
  // eslint-disable-next-line no-undef
  it("it should POST /api/boards", done => {
    const board = {
      userId: 1,
      boardName: "Board"
    };
    chai
      .request(server)
      .post(`/api/boards`)
      .send(board)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });

  it("it should GET all boards", async done => {
    chai
      .request(server)
      .get("/api/boards?userId=1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        res.body.boards.length.should.be.eql(0);
        done();
      });
  });
});
