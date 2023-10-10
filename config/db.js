const mongoose = require('mongoose');
const colors = require('colors')



const connectDB  = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONOG_URL)
    }catch(error){
    }
}

module.exports = connectDB;