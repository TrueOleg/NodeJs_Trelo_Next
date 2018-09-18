import { signToken } from '../helpers/auth';
import db from "../models/index";

const crypto = require('crypto');


async function singIn(req, res, next) {
    try {
        const reqData = req.query
        const { login } = reqData;
        const user = await db.Users.findOne({ where: { login } })
            .then(users => users.dataValues);
        const token = crypto.createHash('md5').update(reqData.password).digest("hex") === user.password
            ? signToken(user.id)
            : null;
        if (token) {
            res.status(200).send({
                message: 'success',
                result: true,
                token
            });
        } else {
            throw new Error('Incorrect password');
        }
    }
    catch (err) {
        next(new Error(err.message));
    };
};

async function singUp(req, res, next) {
    try {
        const { regLogin, regEmail } = req.body;
        let { regPass } = req.body;
        regPass = crypto.createHash('md5').update(regPass).digest("hex");
        const user = await db.Users.findOne({ where: { login: regLogin } }); 
        if (user) {
            res.status(200).send({
                message: 'This login already exists',
                result: false
            })
        } else {
            db.Users
                .build({ login: regLogin, email: regEmail, password: regPass })
                .save()
                .then(user => {
                    const token = signToken(user.id);
                    res.status(201).send({
                        message: 'success',
                        result: true,
                        token
                    });
                })
        }
    }
    catch (err) {
        next(new Error(err.message));
    }
};

export { singIn, singUp };