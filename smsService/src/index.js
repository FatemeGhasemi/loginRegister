const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '4mb'}));
app.use((req, res, next) => {
  console.log("request query ", req.query)
  console.log("request url ", req.url)
  next()
});
const addRoutes = () => {
  app.use('', require('./api/route'));
};

addRoutes();

app.listen(3001, () => {
  console.log("app listening at ", 3001)
});