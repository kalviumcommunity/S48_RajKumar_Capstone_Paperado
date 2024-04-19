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
    
    const { error } = addSignup.validate({ username, email, password });  // Validate request body using Joi
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    const signcheck = await SignupModel.findOne({ username });   // Check if the username already exists
    if (signcheck) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }
    
    const List = new SignupModel({     // Create a new user
      username,
      email,
      password,
    });
    await List.save();
    
    res.json({
      success: true,
      message: "User created successfully",
      user: List,
      });
    } catch (error) {
      console.error("Error creating user:", error);       // Handle any unexpected errors
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the user",
      });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { error } = addLogin.validate({ username, password });        // Validate request body
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await SignupModel.findOne({ username });           // Find user by username in signup database
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});