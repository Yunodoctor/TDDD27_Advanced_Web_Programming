const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OktaJwtVerifier = require('@okta/jwt-verifier')

//Ini app with express
const app = express();

//Middle ware
app.use(bodyParser.json());
app.use(cors());

//Link to file
const posts = require("./routes/api/posts");

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oakcz7giPgvQhucT356',
  issuer: 'https://dev-671702.okta.com/oauth2/default'
}) 

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
