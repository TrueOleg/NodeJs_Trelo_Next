import passport from 'passport';

import { singUp } from '../controllers/auth';

const express = require('express');

const auth = express.Router();

auth.get('/api/auth/signIn', (req, res, next) => {
  passport.authenticate('local', (err, user, data) => {
    const { message, token } = data;
    res.status(data.status).send({ message, token });
  })(req, res, next);
});

auth.get(
  '/api/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
auth.get('/api/auth/google/callback', passport.authenticate('google', {}));

auth.post('/api/auth/signUp', singUp);

export default auth;
