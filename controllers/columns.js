import db from "../models/index";

async function createColumn(req, res, next) {
  try {
    const { boardId, columnName } = req.body;
    const column = await db.Columns.create({
      name: columnName,
      board_id: boardId
    });
    res.status(201).send({
      message: "success",
      result: true,
      column
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getColumns(req, res, next) {
  try {
    const { id } = req.params;

    const columns = await db.Columns.findAll({
      where: { board_id: id },
      raw: true
    });
    res.status(200).send({
      message: "success",
      result: true,
      columns
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function deleteColumn(req, res, next) {
  try {
    const { id } = req.params;

    await db.Columns.findOne({
      where: { id }
    }).then(column => {
      column.destroy();
    });
    res.status(200).send({
      message: "delete",
      result: true
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

export { createColumn, deleteColumn, getColumns };
