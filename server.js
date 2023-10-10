const express  = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const paymentRoute = require('./routes/paymentRoute')
const cors = require('cors');


// configure enviorenment variable 
dotenv.config(); 

// connect to Database
connectDB();

// rest object
const app =  express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));  //========================last   

app.use(morgan('dev'));

// routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/payment',paymentRoute)

app.get('/',(req,res)=>{
    res.send(
        "<h1>hello daya</h1>"
    )
})


const port = process.env.PORT;




app.listen(port,()=>{
    console.log(`server is running on port ${port}`.bgCyan.white);
})

