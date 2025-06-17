const mongoose = require('mongoose');

exports.dbconnect = mongoose.connect('mongodb+srv://ahamedthaiyub27:1234@cluster0.wabhjcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log("connected")).catch((e)=>{console.log(e)}).finally("hahaa connected")
