/* ---------------------------------------------------------------------------------
   * @ description : This is the db configration file.
---------------------------------------------------------------------------------- */

import Mongoose from "mongoose";
// import Bluebird from 'bluebird';
import config from "config";
// import logger from './utilities/logger';

// Connect to MongoDB
const db = config.get("db");

const dbConnection = () => {
  // Build the connection string.
  const mongoUrl = db.auth
    ? `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`
    : `mongodb://${db.host}:${db.port}/${db.name}`;
  //   Mongoose.Promise = Bluebird

  Mongoose.connect(mongoUrl, config.get("db.mongoose"), err => {
    if (err) {
      console.error("+++ DB Error", err);
      // process.exit(1);
    } else {
      console.info("+++ MongoDB Connected");
    }
  });
};

export default dbConnection;
