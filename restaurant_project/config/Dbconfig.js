const mongoose = require('mongoose');

exports.dbconnect = mongoose.connect('mongodb://localhost:27017/restaurant_app')
.then(console.log("connected"))
.catch((e) => { console.log(e) });

