import  createBoard  from "../controllers/boards";

const express = require('express');

const boards = express.Router();

boards.post('/api/boards', createBoard);

// boards.get('/api/users', getUsers);

export default boards;