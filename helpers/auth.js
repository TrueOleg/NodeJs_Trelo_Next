import configJwt from "../config/configJwt";

const jwt = require('jsonwebtoken');

const { secret } = configJwt

function signToken(user_id) {
    const id = jwt.sign({ id: user_id }, secret, { expiresIn: '7d' });
    return id
};

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
            req._userId = decoded.id
        } else {
            const err = new Error('can\'t decode');
            err.status = 401;
            next(err);
        };
        next(err);
    });
};

export { signToken, verifyToken };