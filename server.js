const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const flightsrouter = require("./controllers/flights.router");
const centerrouter = require("./controllers/center.router");
const slotsrouter = require("./controllers/slots.router");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/", flightsrouter);
app.use("/api/v1/user", flightsrouter);
app.use("/api/v1/center", centerrouter);
app.use("/api/v1/slots", slotsrouter);
app.use("*", (req, res) => {
  res.status(404).send(`${req.originalUrl} api not found in server`);
});

module.exports = app;
