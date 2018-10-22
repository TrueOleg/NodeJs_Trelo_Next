import passport from 'passport';
import express from 'express';
import { getUsers, getUser } from '../controllers/users';

const users = express.Router();

users.get(
  '/api/users/:id',
  passport.authenticate('jwt', { session: false }),
  getUser
);

users.get(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  getUsers
);

export default users;
