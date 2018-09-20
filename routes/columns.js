import { createColumn, deleteColumn, getColumns } from "../controllers/columns";

const express = require("express");

const columns = express.Router();

columns.post("/api/columns", createColumn);

columns.get("/api/columns/:id", getColumns);

columns.delete("/api/columns/:id", deleteColumn);

export default columns;
