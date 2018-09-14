import { signToken } from '../helpers/auth';
import { db } from "../models/index";

// const express = require('express');
// const router = express.Router();
// const jwt = require('../helpers/auth')
const crypto = require('crypto');


async function getUser(req, res, next) {
    try {
        console.log('req', req);
        const reqData = req.query
        const { id } = reqData;
        const user = await db.Users.findOne({ where: { id } });
        res.status(200).send({
            message: 'success',
            result: true,
            user
        });
    }
    catch (err) {
        next(new Error(err.message));
    };
};

async function singin(req, res, next) {
    try {
        const reqData = req.query
        const { login } = reqData;
        const user = await db.Users.findOne({ where: { name: login } })
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

async function singup(req, res, next) {
    try {
        const { regLogin, regEmail } = req.body;
        let { regPass } = req.body;
        regPass = crypto.createHash('md5').update(regPass).digest("hex");
        const user = await db.Users.findOne({ where: { name: regLogin } });
        if (user) {
            res.status(200).send({
                message: 'This login already exists',
                result: false
            })
        } else {
            db.Users
                .build({ name: regLogin, email: regEmail, password: regPass })
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

async function getUsers(req, res, next) {
    try {

        const users = await db.Users.findAll({ attributes: ['id', 'login'] });
        res.status(201).send({
            message: 'success',
            result: true,
            users
        });

    }
    catch (err) {
        next(new Error(err.message));
    }
};




export { singin, singup, getUsers, getUser };