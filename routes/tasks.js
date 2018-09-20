import { createTask, getTasks, deleteTask } from "../controllers/tasks";

const express = require("express");

const tasks = express.Router();

tasks.post("/api/tasks", createTask);

tasks.get("/api/tasks/:id", getTasks);

tasks.delete("/api/tasks/:id", deleteTask);

export default tasks;
