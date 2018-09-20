import {
  createBoard,
  getBoards,
  getBoard,
  deleteBoard
} from "../controllers/boards";

const express = require("express");

const boards = express.Router();

boards.post("/api/boards", createBoard);

boards.get("/api/boards", getBoards);

boards.get("/api/boards/:id", getBoard);

boards.delete("/api/boards/:id", deleteBoard);

export default boards;
