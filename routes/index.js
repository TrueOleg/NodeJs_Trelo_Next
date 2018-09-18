import auth from "./auth";
import users from "./users";
import boards from "./boards";

const express = require('express');

const router = express.Router();

router.use('/', auth);
router.use('/', users);
router.use('/', boards);

module.exports = router;