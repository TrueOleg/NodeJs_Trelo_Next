import { singin, singup } from "../controllers/auth";

const express = require('express');

const auth = express.Router();

auth.get('/api/auth/signIn', singin);

auth.post('/api/auth/signUp', singup);

export default auth;