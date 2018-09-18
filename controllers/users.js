import db from "../models/index";

async function getUser(req, res, next) {
    try {
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
        const PAGE = 1;
        const PER = 5;
        let limit;
        let offset;
        const { page, per, sort } = req.query;
        if (page===null&&per===null) {
            limit = PER;
            offset = PAGE*limit-limit; 
        } else {
            limit = Number(per);
            offset = Number(page)*limit-limit;
        }
        
        const users = await db.Users.findAll({ offset, limit, attributes: ['id', 'login'] });
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