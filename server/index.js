const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const upload = require("express-fileupload");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const app = express();

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload()); // File upload handling
app.use("/uploads", express.static(__dirname + "/uploads")); // Serving uploaded files

// CORS Setup
const allowedOrigins = [ "http://localhost:3000"]; // Added localhost for local dev

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests without origin (for non-browser clients)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.options("*", cors()); // Preflight response for all routes


// Test Routes
app.get("/", (req, res) => res.send("Welcome to Origami blog."));
app.get("/dbstatus", (req, res) =>
  res.json({
    status: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
);

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
