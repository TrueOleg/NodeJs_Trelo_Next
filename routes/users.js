import { getUsers, getUser } from "../controllers/users";

const express = require('express');

const users = express.Router();

users.get('/api/users/:id', getUser);

users.get('/api/users', getUsers);

export default users;