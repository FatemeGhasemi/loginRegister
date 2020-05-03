const mongoose = require('mongoose');
let mongoUrl = "mongodb://"

// mongoUrl +="localhost:27030/mongodbMicroServiceTest"
mongoUrl += process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB_NAME;

const initMongo = () => {
  console.log("mongoUrl:", mongoUrl);
  mongoose.connect(mongoUrl, {useNewUrlParser: true});
  const db = mongoose.connection;
  db.on('error',
    (e) => {
      console.log('db connection error...', e)
      throw e
    });
  db.once('open', () => {
    console.log('db opened...');
    // eslint-disable-next-line no-console
    console.error('db opened ...');
  });
};

module.exports = {initMongo}