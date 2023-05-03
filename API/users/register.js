const express = require("express");
const register = express.Router();
const users = require("../../db/users");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const SALT = 10;

//Register User
register.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || email === "") {
    return res.status(400).send({
      isRegistered: false,
      message: "Email required !",
    });
  }

  if (!password || password === "") {
    return res.status(400).send({
      isRegistered: false,
      message: "Password required !",
    });
  }

  if (!firstName || firstName === "") {
    return res.status(400).send({
      isRegistered: false,
      message: "First name required !",
    });
  }

  if (!lastName || lastName === "") {
    return res.status(400).send({
      isRegistered: false,
      message: "Last name required !",
    });
  }

  const usersCollection = await users();
  const response = await usersCollection.findOne({ email });

  if (response) {
    return res.status(400).send({
      isRegistered: false,
      message: `User with email ${email} already exsits`,
    });
  }

  bcrypt.hash(password, SALT, async (error, hash) => {
    try {
      const insertUser = await usersCollection.insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        isRegistered: true,
        isLoggedIn: false,
        active: true,
      });

      if (!insertUser) {
        return res.status(400).send({
          isRegistered: false,
          message: error,
        });
      }

      res.status(200).send({
        isRegistered: true,
        message: `User with email ${email} registered successfully!`,
      });
    } catch (err) {
      res.status(400).send({
        isRegistered: false,
        message: err,
      });
    }
  });
});

module.exports = register;
