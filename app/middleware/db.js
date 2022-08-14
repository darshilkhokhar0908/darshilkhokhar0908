const Mongoose = require("mongoose");
global.ObjectId = Mongoose.Types.ObjectId;

const db = {};

db.connect = () => {

    Mongoose.connect("mongodb://localhost:27017/testing", {useNewUrlParser: true});
    
    let mongodb = Mongoose.connection;
    
    mongodb.on('error', err => console.log("connection error: ", err));
    mongodb.once('open', () => console.log("Mongo connected"));
    
    Mongoose.set('debug', true);
    
}

module.exports = db;