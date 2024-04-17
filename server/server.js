const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PUBLIC_PORT || 3000;
const mongobduri = process.env.MONGODB_URI

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