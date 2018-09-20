import db from "../models/index";

const { Op, col, where } = db.sequelize;

async function createBoard(req, res, next) {
  try {
    const { userId, boardName } = req.body;
    const board = await db.Boards.create({ title: boardName, owner: userId });
    res.status(201).send({
      message: "success",
      result: true,
      board
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getBoard(req, res, next) {
  try {
    const { id } = req.params;

    const board = await db.Boards.findOne({
      where: { id },
      attributes: ["title", "id", "owner"],
      raw: true
    });
    res.status(200).send({
      message: "success",
      result: true,
      board
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function deleteBoard(req, res, next) {
  try {
    const { id } = req.params;

    await db.Boards.findOne({
      where: { id }
    }).then(board => {
      board.destroy();
    });
    res.status(200).send({
      message: "delete",
      result: true
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getBoards(req, res, next) {
  try {
    const PAGE = 1;
    const PER = 5;
    let offset;
    let limit;

    const { page, per, userId } = req.query;

    if (page === null && per === null) {
      limit = PER;
      offset = PAGE * limit - limit;
    } else {
      limit = Number(per);
      offset = Number(page) * limit - limit;
    }
    const boards = await db.Boards.findAll({
      offset,
      limit,
      attributes: ["title", "id", "owner"],
      raw: true,
      include: {
        as: "share",
        model: db.Users,
        attributes: [],
        where: {
          [Op.or]: [where(col("user_id"), userId), where(col("owner"), userId)]
        },
        raw: true,
        required: false
      }
    });
    res.status(200).send({
      message: "success",
      result: true,
      boards
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

export { createBoard, getBoards, getBoard, deleteBoard };
