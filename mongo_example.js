"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.err(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    db.collection("tweets").find({}, (err, result) => {
      if(err) throw err;

      console.log("for each item yeilded by the cursor");
        result.toArray((err, resultArray) => {
        if(err) throw err;

        console.log("resultArray: ", resultArray);


         db.close();
      });
    });
  });
