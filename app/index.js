const express = require("express");
const morgan = require("morgan");
const routeHandler = require("../app/routes/");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

// localhost:3000
app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the API",
    sucess: true,
  });
});

//localhost:3000/api/v1
app.use("/api/v1", routeHandler);

app.use("/*wildcard", (req, res) => {
  res.status(404).json({
    message: "This is not a valid endpoint",
    sucess: false,
  });
});

module.exports = app;
