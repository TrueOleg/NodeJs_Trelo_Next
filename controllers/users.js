import db from "../models/index";

async function getUser(req, res, next) {
    try {
        console.log('req', req.params.id)
        
        const { id }  = req.params;
        const user = await db.Users.findOne({ where: { id }, attributes: ['id', 'login'] });
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

async function getUsers(req, res, next) {
    try {

        const users = await db.Users.findAll({ attributes: ['id', 'login'] });
        res.status(200).send({
            message: 'success',
            result: true,
            users
        });

    }
    catch (err) {
        next(new Error(err.message));
    }
};

export { getUsers, getUser };