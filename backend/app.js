const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require('multer');
const moment = require('moment');
const countriesData = require("./Data.json")
const User = require("./model/jwt");
const Form = require("./model/form");

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
app.get('/api/getdata',authenticateUser, async (req, res) => {
  try {
    const formData = await Form.find();
    console.log(formData);
    res.status(200).json(formData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

app.use('/resources', express.static(__dirname + '/public/uploads'));
console.log(__dirname)

const upload = multer({ storage: storage });

app.get('/api/form', async (req, res) => {
  try {
    const formData = await Form.find();
    console.log(formData);
    res.status(200).json(formData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


app.post('/api/form',  upload.single('image'),   async (req, res) => {
  try {
    const { username, fname, lname, password, mobileno, countrydata, statedata, citydata } = req.body;
    const image = req.file ? req.file.filename : null;
    const dob = moment(req.body.dob, 'YYYY-MM-DD');
    const formData = new Form({
      username,
      fname,
      lname,
      password,
      mobileno,
      image,
      dob,
      countrydata,
      statedata,
      citydata
    });

    await formData.save();

    res.status(201).json({ message: 'Form data saved successfully.' });
    console.log(req.body)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


app.delete("/api/form/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const emp = await Form.findByIdAndDelete(_id);
    console.log(req.body);
    res.send(emp);
  } catch (e) {
    res.status(500).send(e);
  }
})

app.put("/api/form/:id", upload.single('image'), async (req, res) => {
  try {
    const _id = req.params.id;


    if (req.file) {
      req.body.image = req.file.filename;
    } else {
      delete req.body.image;
    }

    console.log(req.body);

    const emp = await Form.findByIdAndUpdate(_id, req.body, { new: true });
    console.log(_id);

    res.send(emp);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});



app.get('/countries', (req, res) => {
  res.json(countriesData.country);
});

app.get('/states/:countryId', (req, res) => {
  const countryId = parseInt(req.params.countryId);
  const country = countriesData.country.find(c => c.id === countryId);
  if (!country) {
    res.status(404).json({ message: 'Country not found' });
    return;
  }
  res.json(country.states);
});

app.get('/cities/:stateId', (req, res) => {
  const stateId = parseInt(req.params.stateId);
  const cities = countriesData.country.flatMap(c => c.states).find(s => s.id === stateId)?.cities || [];
  res.json(cities);
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
