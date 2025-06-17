const mongoose = require('mongoose');

exports.dbconnect = mongoose.connect('mongodb://localhost:27017/restaurant_mongo').then(console.log("connected")).catch((e)=>{console.log(e)}).finally("hahaa connected")