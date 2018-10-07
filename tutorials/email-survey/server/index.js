const express = require("express");
const log = require("debug")("server:index");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  log(`${req.method} - ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "it is working" });
});

app.listen(port, () => {
  log(`Servers started listening on port ${port}`);
});
