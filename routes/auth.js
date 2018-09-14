import { singin, singup, getUsers, getUser } from "../controllers/auth";

const express = require('express');

const auth = express.Router();

auth.get('/api/users/:id', getUser);

auth.get('/api/users/auth', singin);

auth.post('/api/users', singup);

auth.post('/api/users', getUsers);
export default auth;