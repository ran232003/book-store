const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MyError = require("../models/MyError");
const User = require("../models/user-schema");
app.use(bodyParser.json());
const signUp = async (req, res, next) => {
  console.log("signup", req.body);
  try {
    const { email, password, name } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      const err = new MyError("User Exist", 400);
      return next(err);
    }
    const hashPassword = await bcrypt.hash(password, 12);
    let user = new User({ email: email, password: hashPassword, name: name });
    await user.save();
    let token = jwt.sign({ id: user._id, email: user.email }, "my-secret", {
      expiresIn: "1d",
    });
    res.status(201);
    res.cookie("Auth_Cookie", token);
    return res.json({ status: "ok", user, msg: "Success" });
  } catch (error) {
    console.log(error);
    const err = new MyError("Somthing Went Wrong", 500);
    return next(err);
  }
};
const login = async (req, res, next) => {
  console.log("login", req.body);
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      const err = new MyError("User Not Exist", 400);
      return next(err);
    }
    let passwordCheck = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!passwordCheck) {
      const err = new MyError("Wrong Details", 400);
      return next(err);
    }

    let token = jwt.sign({ id: checkUser._id, email: email }, "my-secret", {
      expiresIn: "1d",
    });
    res.status(201);
    res.cookie("Auth_Cookie", token);
    // res.setHeader("Set-Cookie", token);
    return res.json({ status: "ok", user: checkUser, msg: "Success" });
  } catch (error) {
    const err = new MyError("Somthing Went Wrong", 500);
    return next(err);
  }
};

module.exports = {
  signUp,
  login,
};
