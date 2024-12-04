const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require('joi');
require("dotenv").config();
const { LoginModel, addLogin, SignupModel, addSignup } = require('./model/user');
const port = process.env.PUBLIC_PORT || 3000;
const mongobduri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hi"));

app.get("/paperado", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ status: isConnected ? "Connect" : "Disconnected" });
});
mongoose.connect(mongobduri)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    )
  )
  .catch((error) => console.error("Error connecting to MongoDB:", error));

  app.post("/api/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validate request body using Joi
      const { error } = addSignup.validate({ username, email, password });
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      // Check if the username already exists
      const signcheck = await SignupModel.findOne({ username });
      if (signcheck) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
  
      // Create a new user
      const signupuser = new SignupModel({
        username,
        email,
        password,
      });
      await signupuser.save();
  
      res.json({
        success: true,
        message: "User created successfully",
        user: signupuser,
      });
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error creating user:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the user",
      });
    }
  });

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate request body
    const { error } = addLogin.validate({ username, password });
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Find user by username in signup database
    const user = await SignupModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }  
    const token = jwt.sign({ username: user.username }, secretKey)
    // Set cookie with token
    res.cookie("token", token, { httpOnly: true });


    // Set cookie and respond
    res.cookie("username", username);
    res.json({ success: true, message: "Login successful", username,token });
    console.log("login success", username);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});