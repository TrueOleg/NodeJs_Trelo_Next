import { expect } from '../node_modules/chai';

const db = require("../models/index");


describe('user model create', () => {
    let user = {};
    beforeEach((done) => {

        db.sequelize.sync({ force: true }) // drops table and re-creates it
            .then(async () => {
                const data = await db.Users.create({
                    login: 'Batman',
                    email: '1@gmail',
                    password: "1",
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                user = data;
                done();
            })
            .catch((error) => {
                done(error);
            });
    });


    it('should create users', async () => {
        const us = await db.Users.findOne({ where: { id: 1 }, raw: true });
        expect(us.login).to.equal('Batman');
    });


    it("have users association", async () => {
        const data = await db.Boards.create({
            name: 'Boards',
            owner: 1,
            users_id: 1,
            owned: false
        }).then(boards => {
            return user.hasBoards(boards).then(result => {
                return result;
            });
        });
        expect(data).to.equal(false);
    });

    it("User should wrong data type in login", (done) => {
        db.Users.create({
            login: 1,
            email: '1@gmail',
            password: "1",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }).then(() => {
            expect.fail();
            done();
        }).catch((err) => {
            expect(err.name).to.be.equal('SequelizeValidationError');
            done();
        });
    });

    it("User should void in login", (done) => {
        db.Users.create({
            login: null,
            email: '1@gmail',
            password: "1",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }).then(() => {
            expect.fail();
            done();
        }).catch((err) => {
            expect(err.name).to.be.equal('SequelizeValidationError');
            done();
        });
    });
});

