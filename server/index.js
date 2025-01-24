const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require('joi');
require("dotenv").config();
const upload = require("express-fileupload");
const { LoginModel, addLogin, SignupModel, addSignup } = require('./model/user');
const Post = require("./model/Post");
const { updatePost, createPost } = require("./controllers/postControllers");

const port = process.env.PORT || 3000;
const mongobduri = process.env.MONGO_URI;

const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());
app.use("/uploads", express.static(__dirname + "/uploads")); // Serving uploaded files

// CORS Setup
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.options("*", cors());

// Test Routes
app.get("/", (req, res) => res.send("Welcome to Origami blog."));
app.get("/paperado", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ status: isConnected ? "Connect" : "Disconnected" });
});

app.get("/dbstatus", (req, res) =>
  res.json({
    status: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
);

// Post Update Route
app.put("/api/posts/:id", updatePost);
app.post("/api/posts", createPost);

// User Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error } = addSignup.validate({ username, email, password }); // Validate request body using Joi
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const signcheck = await SignupModel.findOne({ username }); // Check if the username already exists
    if (signcheck) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const List = new SignupModel({ // Create a new user
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
    console.error("Error creating user:", error); // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
});

// User Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { error } = addLogin.validate({ username, password }); // Validate request body
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await SignupModel.findOne({ username }); // Find user by username in signup database
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Connect to MongoDB
mongoose
  .connect(mongobduri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));
