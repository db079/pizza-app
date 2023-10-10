const express = require('express');
const {checkout,paymentVerification} = require('../controllers/paymentController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const app = express();
app.use(express.json())

const router = express.Router();

router.post('/checkout', requireSignIn,checkout)
router.post('/verify', paymentVerification)

router.get('/getkey',(req,res)=>{
    res.status(200).send({key:process.env.RAZORPAY_API_KEY})
})

module.exports = router