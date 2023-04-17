require("dotenv").config();

const mongoose = require("mongoose");
const MongoUrl = process.env.MongoUrl;
console.log(MongoUrl);

const connection = mongoose
  .createConnection(MongoUrl)
  .on("open", () => {
    console.log("MongoDB connected");
  })
  .on("error", () => {
    console.log("MongoDB error");
  });

module.exports = connection;
