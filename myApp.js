let express = require('express');
let app = express();
require('dotenv').config();
//console.log("Hello World");

const path = __dirname + "/views/index.html";

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(res) {
  res.sendFile(path);
});

//let obj = {
//  message: "Hello json",
//};

//app.get("/json", (req, res) => {
//  if (process.env.MESSAGE_STYLE == "uppercase") {
//    obj.message = obj.message.toUpperCase();
//  }
//  res.json(obj);
//});

//app.use("/", (req, res, next) => {
//  console.log(`${req.method} ${req.path} - ${req.ip}`);
//  next();
//});

app.get("/now", (req, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time })
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});


app.route("/name").get((req, res) => {
  let { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
}).post();






















module.exports = app;
