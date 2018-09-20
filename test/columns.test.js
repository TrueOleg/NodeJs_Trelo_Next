import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";
import db from "../models/index";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

// eslint-disable-next-line no-undef
describe("---Test columns route---", () => {
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
        await db.Columns.create({
          name: "Column",
          board_id: 1,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  // eslint-disable-next-line no-undef
  it("it should POST /api/columns", done => {
    const column = {
      columnName: "Column 1",
      boardId: 1
    };
    chai
      .request(server)
      .post(`/api/columns`)
      .send(column)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it("it should GET columns to one board", done => {
    const boardId = 1;
    chai
      .request(server)
      .get(`/api/columns/${boardId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        res.body.columns[0].should.have.property("name");
        server.close();
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should DELETE column", done => {
    const columnId = 1;
    chai
      .request(server)
      .delete(`/api/columns/${columnId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        server.close();
        done();
      });
  });
});
