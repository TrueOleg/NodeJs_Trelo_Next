import { signToken } from "../helpers/auth";
import db from "../models/index";

const crypto = require("crypto");

async function singIn(req, res, next) {
  try {
    console.log("req", req.query);
    const { login, password } = req.query;
    const user = await db.Users.findOne({ where: { email: login } })
    let token;
    if (user) {
      token =
        crypto
          .createHash("md5")
          .update(password)
          .digest("hex") === user.password
          ? signToken(user.id)
          : null;
      if (token) {
        res.status(200).send({
          message: "success",
          result: true,
          token
        });
      } else {
        next({ message: 'Incorrect password', status: 403 });
      }
    } else {
      next({ message: 'Incorrect login', status: 401 });
    }


  } catch (err) {
    next(new Error(err.message));
  }
}

async function singUp(req, res, next) {
  try {
    const { email } = req.body;
    let { password } = req.body;
    password = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");
    const user = await db.Users.findOne({ where: { email } });
    if (user) {
      next({ message: 'This login already exists', status: 409 });
    } else {
      db.Users.build({ email, password })
        .save()
        .then(user => {
          const token = signToken(user.id);
          res.status(201).send({
            message: "success",
            result: true,
            token
          });
        });
    }
  } catch (err) {
    next(new Error(err.message));
  }
}

export { singIn, singUp };
