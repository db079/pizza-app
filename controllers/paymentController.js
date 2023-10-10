const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const crypto = require('crypto');
const express = require('express');
const OrderModels = require('../modles/orderModels');
const sendMail = require('../utils/sendMail')
const baseModels = require('../modles/product/baseModels');
const sauceModels = require('../modles/product/sauceModels');
const cheeseModels = require('../modles/product/cheeseModels');
const vegiesModels = require('../modles/product/vegiesModels');
const app = express();

app.use(express.json());
// configure enviorenment variable 
dotenv.config();


// Initialize the Razorpay instance with your API key and secret
// making razorpay instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRETE,
});


const checkout = async (req, res) => {
    const { cart } = req.body;
    const user = req.user._id;

    let total = 0;
    cart.map((item) => {
        total += item.price;
    });

    const options = {
        amount: Number(total * 100), // Amount in the smallest currency unit (e.g., 100 = 1 INR)
        currency: "INR",
    };

    try {
        const order = await instance.orders.create(options);
        // Create a new order document using the orderModels model
        const newOrder = new OrderModels({
            products: cart,
            buyer: user,
            order_id:order.id
            // Other fields related to the order
        });

        // Save the order to the database
        await newOrder.save();

        // Send the response to the client
        res.status(200).send({
            success: true,
            message: "Waiting for transaction completion",
            order,
            cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Payment failed",
            error,
        });
    }
};

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRETE).update(body.toString()).digest('hex');


    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const order = await OrderModels.findOne({order_id: razorpay_order_id }).populate("products");

        try{if (order) {
            // Update the order with payment details
            order.payment_id = razorpay_payment_id;
            await order.save();


            // give code here to update quantity
            // base
            const bid = order.products[0].base;
            const baseDoc = await baseModels.findById(bid);
            baseDoc.quantityAvailable -= 1;
            await baseDoc.save();
            if(baseDoc.quantityAvailable <= 5){
                let info = await sendMail(process.env.ADMIN_MAIL,"stock alert",`In Stock ${baseDoc.name} base needed `)
                
            }
            const sid = order.products[0].sauce;
            const sauceDoc = await sauceModels.findById(sid);
            sauceDoc.quantityAvailable -= 1;
            await sauceDoc.save();
            if(sauceDoc.quantityAvailable <= 5){
                let info = await sendMail(process.env.ADMIN_MAIL,"stock alert",`In Stock ${sauceDoc.name} sauce needed `)
               
            }
            // cheese 
            const cid = order.products[0].cheese;
            const cheeseDoc = await cheeseModels.findById(cid);
            cheeseDoc.quantityAvailable -= 1;
            await cheeseDoc.save();
            if(cheeseDoc.quantityAvailable <= 5){
                let info = await sendMail(process.env.ADMIN_MAIL,"stock alert",`In Stock ${cheeseDoc.name} cheese needed `);
            }
            // veggies
            const vid = order.products[0].veggies;
            const veggiesDoc = await vegiesModels.findById(vid);
            veggiesDoc.quantityAvailable -= 1;
            await veggiesDoc.save();
            if(veggiesDoc.quantityAvailable <= 5){
                let info = await sendMail(process.env.ADMIN_MAIL,"stock alert",`In Stock ${veggiesDoc.name} cheese needed `);
            }


            res.redirect(`${process.env.REACTAPP}/PaymentSuccess/${razorpay_payment_id}`)
        } else {
            res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }}catch(error){
        }
    } else {
        return res.status(500).send({
            success: false,
            message: "payment unscessfull please try again "
        })
    }

};

module.exports = { checkout, paymentVerification };
