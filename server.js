// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.get("/", function (req, res) {
  res.sendFile(__dirname + "index.html");
  res.send(projectData);
});

app.post("/", function (req, res) {
  console.log(req.body.city);
  res.render("index");
});

//post route to addWeather details
app.post("/addWeather", addWeather);

function addWeather(req, res) {
  newEntry = {
    temp: req.body.temp,
    input: req.body.userInput,
    date: req.body.date,
  };
  projectData = newEntry;
  res.send(projectData);
}

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
