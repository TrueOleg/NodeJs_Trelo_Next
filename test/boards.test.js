import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";
import db from "../models/index";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// eslint-disable-next-line no-undef
describe("---Test boards route---", () => {
  // eslint-disable-next-line no-undef
  beforeEach(done => {
    db.sequelize
      .sync({ force: true }) // drops table and re-creates it
      .then(async () => {
        await db.Users.create({
          login: "Batman",
          email: "1@gmail",
          password: "1",
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        await db.Users.create({
          login: "Flash",
          email: "1@gmail",
          password: "1",
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        await db.Boards.create({
          title: "Boardtwo",
          owner: 1,
          owned: true,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        await db.Boards.create({
          title: "Boardthree",
          owner: 2,
          owned: true,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        await db.Shares.create({
          board_id: 2,
          user_id: 1
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it("it should POST /api/boards", done => {
    const board = {
      title: "Board 1",
      users_id: 1,
      share: false
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
  // eslint-disable-next-line no-undef
  it("it should GET all boards", done => {
    chai
      .request(server)
      .get("/api/boards?userId=1&page=1&per=5")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        res.body.boards[0].should.have.property("title");
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it("it should GET board", done => {
    const boardId = 1;
    chai
      .request(server)
      .get(`/api/boards/${boardId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        res.body.board.should.have.property("title");
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it("it should DELETE board", done => {
    const boardId = 1;
    chai
      .request(server)
      .delete(`/api/boards/${boardId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });
});
