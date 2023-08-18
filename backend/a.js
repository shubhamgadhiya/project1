const express = require('express');
require("./db/conn");
const User = require("./model/jwt")
const app = express();
app.use(express.json());


app.get("/register", async (req,res) => {

        try {
            const userdara = await User.find();
            res.status(200).json(userdara);
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong.' });
          }
        });
    

app.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email , password } = req.body;
      const userdara = new User({
        first_name,
        last_name,
       email,
        password,
      });
      
      await userdara.save();

      res.status(201).json({ message: 'Form data saved successfully.' });
      console.log(req.body)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });