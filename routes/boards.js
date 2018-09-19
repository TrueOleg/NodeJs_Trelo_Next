import  { createBoard, getBoards }  from "../controllers/boards";

const express = require('express');

const boards = express.Router();

boards.post('/api/boards', createBoard);

boards.get('/api/boards', getBoards);

export default boards;