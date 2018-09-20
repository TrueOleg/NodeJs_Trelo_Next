import auth from "./auth";
import users from "./users";
import boards from "./boards";
import columns from "./columns";
import tasks from "./tasks";

const express = require("express");

const router = express.Router();

router.use("/", auth);
router.use("/", users);
router.use("/", boards);
router.use("/", columns);
router.use("/", tasks);

module.exports = router;
