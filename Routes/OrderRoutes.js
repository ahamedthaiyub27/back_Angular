const express = require('express');
const router = express.Router();
const Order = require('../Models/overallmodel');




//to get all oreder
exports.getall = async(req,res)=>{
    try {
        const data = await Order.find({});

    res.status(200).json({
        data,
        message:"all done "
    })
        
    } catch (error) {
        res.status(500).json(error)
        
    }

}


exports.post_orders = async (req,res)=>{
    try {
        const data = req.body
    ;
    const new_orders = Order.create(data);
     res.status(200).json({
        data,
        new_orders,
        message:"all done "
    })
        
    } catch (error) {
         res.status(500).json(error)
    }

}
