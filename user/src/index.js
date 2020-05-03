require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./db/mongoConnector")

db.initMongo()

app.use(bodyParser.json({limit: '4mb'}));
app.use((req, res, next) => {
  console.log("request query ", req.query)
  console.log("request url ", req.url)
  next()
});
const addRoutes = () => {
  app.use('', require('./api/routes'));
};

addRoutes();

app.listen(3002, () => {
  console.log("app listening at ", 3002)
});