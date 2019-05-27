const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//Ini app with express
const app = express();

//Middle ware
app.use(bodyParser.json());
app.use(cors());

//Link to file
const posts = require("./routes/api/posts");

mongoose
  .connect(
    'mongodb+srv://abc123:abc123%21@cluster0-afmwr.mongodb.net/Cluster0?retryWrites=true"',
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.log(err));

app.use("/api/posts", posts);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handel Single Page Application (SPA)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

//Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
