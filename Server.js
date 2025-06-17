const mongoose = require('mongoose');
const express= require('express');
const app = express();
const dotenv = require('dotenv');
const { dbconnect } = require('./config/dbconfig');
const router = require('./Routes/Overall_');
const router_menu = require('./Routes/Menu_routes');
const PORT = 8000
const cors = require('cors')


//db connect 
dbconnect
//middlewares:
app.use(cors());
app.use(express.json());
app.use('',router)
app.use('/menu',router_menu);





app.listen(PORT,(req,res)=>{
    console.log("app is listening",PORT)
})
