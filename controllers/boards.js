import db from "../models/index";

async function createBoard(req, res, next) {
    try {
        const { userId, boardName }  = req.body;
        const board = await db.Boards
            .build({ name: boardName, owner: userId })
            .save()
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
        const { id }  = req.params;
        const boards = await db.Boards
            .build({ name: boardName, owner: userId })
            .save()
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

export default createBoard;