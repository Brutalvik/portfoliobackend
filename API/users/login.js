const express = require("express");
const login = express.Router();
const users = require("../../db/users");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const SALT = 10;

login.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || email === "") {
    return res.status(400).send({
      isLoggedin: false,
      message: "Email required !",
    });
  }

  if (!password || password === "") {
    return res.status(400).send({
      isLoggedin: false,
      message: "Password required !",
    });
  }

  const usersCollection = await users();
  const response = await usersCollection.findOne({ email });
  if (!response) {
    return res.status(400).send({
      isLoggedin: false,
      message: `No user with email ${email} exists`,
    });
  }
  bcrypt.compare(password, response.password, async (error, result) => {
    if (error) {
      return res.status(400).send({
        isLoggedin: false,
        message: error,
      });
    }

    if (!result) {
      return res.status(400).send({
        isLoggedin: false,
        message: "Password incorrect",
      });
    }

    const updateResponse = await usersCollection.updateOne(
      { email },
      { $set: { isLoggedin: true } }
    );

    if (!updateResponse.acknowledged) {
      return res.status(400).send({
        isLoggedin: false,
        message: "Something went wrong",
      });
    }

    res.status(200).send({
      isLoggedin: true,
      message: "User logged in successfully",
      data: {
        firstName: response.firstName,
        lastName: response.lastName,
        isLoggedin: updateResponse.acknowledged,
        id: response._id,
      },
    });
  });
});

module.exports = login;
