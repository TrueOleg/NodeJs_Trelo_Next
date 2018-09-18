import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";
import db from "../models/index";

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = "test";

beforeEach(async () => {
    await db.Users.sync();
    await db.Users.create({
      login: 'Flash',
      email: '1@gmail',
      password: "1",
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    await db.Users.create({
        login: 'GreenArrow',
        email: '2@gmail',
        password: "1",
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
    await db.Boards.create({
        name: 'Board',
        owner: 2,
        owned: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
    await db.Boards.create({
        name: 'BoardTwo',
        owner: 1,
        owned: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
    await db.Boards.create({
        name: 'BoardTwo',
        owner: 1,
        owned: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
  })
// eslint-disable-next-line no-undef
describe("---Test boards route---", () => {
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
  
});