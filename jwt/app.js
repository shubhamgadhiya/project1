const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

require("./db/conn")
const User = require("./model/jwt")
const authenticateUser = require("./middleware/authenticate");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/register', async (req, res) => {
    try {
      const userdata = await User.find();
      res.status(200).json(userdata);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

app.post('/register', async (req, res) => {
    console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/login', async (req, res) => {
    console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send('user not exists');
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('password not match');
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey', {expiresIn: "1h"});
    res.cookie("usercookie",token);

    res.json({token }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/protected',   authenticateUser, (req, res) => {
  try {res.send(`Welcome to Shubham Gadhiya`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
