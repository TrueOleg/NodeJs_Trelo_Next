import db from "../models/index";

async function createTask(req, res, next) {
  try {
    const { columnId, title, conten, position } = req.body;
    const task = await db.Tasks.create({
      columnId,
      title,
      conten,
      position
    });
    res.status(201).send({
      message: "success",
      result: true,
      task
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function getTasks(req, res, next) {
  try {
    const { id } = req.params;

    const tasks = await db.Tasks.findAll({
      where: { column_id: id },
      raw: true
    });
    console.log("tasks", tasks);

    res.status(200).send({
      message: "success",
      result: true,
      tasks
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    await db.Tasks.findOne({
      where: { id }
    }).then(task => {
      task.destroy();
    });
    res.status(200).send({
      message: "delete",
      result: true
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

export { createTask, deleteTask, getTasks };
