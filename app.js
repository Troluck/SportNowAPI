const express = require("express");
const body_parser = require("body-parser");
const Route = require("./routers/router");

const app = express();

app.use(body_parser.json());

app.use("/", Route);
module.exports = app;
