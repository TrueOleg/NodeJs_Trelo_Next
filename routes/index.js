import auth from "./auth";
import users from "./users";

const express = require('express');

const router = express.Router();

router.use('/', auth);
router.use('/', users);

module.exports = router;