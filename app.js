const express = require("express");
const categories = require("./routes/categories");
const products = require("./routes/products");
const user = require("./routes/users");
const db = require("./models/index");
const Errors = db.ErrorLoger;

const app = express();
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/user", user);

app.use(async (err, req, res, next) => {
  const error = await err;
  const logError = await Errors.create({
    err_name: error.name,
    err_message: error.errors[0].message,
    err_type: error.errors[0].type,
    err_value: error.errors[0].value,
    sqlMessage: error.parent.sqlMessage,
    sqlQuery: error.sql,
  });
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error !" });
});
process.on("uncaughtException", (err) => {
  console.error(new Date().toUTCString() + "uncaughtException:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(new Date().toUTCString() + "unhandledRejection:", err.message);
  process.exit(1);
});

module.exports = app;
