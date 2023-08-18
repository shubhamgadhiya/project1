const mongoose1 = require("mongoose");
const conn1 = require("../db/conn1")

const userSchema = new mongoose1.Schema({
    name: String,
    email: String,
    password: String,
  });

  const User = conn1.model("User", userSchema)

  module.exports = User;
