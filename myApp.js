const bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();
require('body-parser');
//console.log("Hello World");

const path = __dirname + "/views/index.html";
const mware = bodyParser.urlencoded({ extended: false });

app.use("/public", express.static(__dirname + "/public"));
app.use(mware);

app.get("/", (req, res) => {
  res.sendFile(path);
});

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
}).post((req, res) => {
  let input = req.body.first + " " + req.body.last;
  res.json({ name: input });
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

module.exports = app;
