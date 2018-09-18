import { singIn, singUp } from "../controllers/auth";

const express = require('express');

const auth = express.Router();

auth.get('/api/auth/signIn', singIn);

auth.post('/api/auth/signUp', singUp);

export default auth;