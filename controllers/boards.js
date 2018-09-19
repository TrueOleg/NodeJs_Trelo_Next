import db from "../models/index";

const { Op, fn, col, where } = db.sequelize;

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

async function getBoards(req, res, next) {
  try {
    const { userId } = req.query;
    console.log("---------------boards--------", db.Boards);

    const exp = await db.Boards.findAll({
      where: { owner: userId },
      raw: true,
      include: {
        as: "share",
        model: db.Users,
        where: {
          [Op.or]: [where(col("user_id"), userId)]
        },
        raw: true
      },
      //   where: { user_id: userId },
      //   required: false
      // include: [
      //   {
      //     model: db.comments
      //   }
      // ]

      required: false
    });
    console.log("-------------bum--------", exp);
    // const boards = await db.Boards.findAll({
    //   where: { owner: userId },
    //   raw: true
    // });
    // console.log("-------------boards--------", boards);
    res.status(200).send({
      message: "success",
      result: true,
      boards
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

export { createBoard, getBoards };
