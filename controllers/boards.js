import db from "../models/index";

async function createBoard(req, res, next) {
    try {
        const { userId, boardName }  = req.body;
        const board = await db.Boards.create({ title: boardName, owner: userId });
        res.status(201).send({
            message: 'success',
            result: true,
            board
        });
    }
    catch (err) {
        next(new Error(err.message));
    };
};

async function getBoards(req, res, next) {
    try {
        const { userId } = req.query;
        console.log('---------------boards--------', db.Boards);
        console.log('---------------users--------', db.Users);
        const boards = await db.Boards.findAll({ where: { owner: userId }});
        res.status(200).send({
            message: 'success',
            result: true,
            boards
        });
    }
    catch (err) {
        next(new Error(err.message));
    };
};

export { createBoard, getBoards };