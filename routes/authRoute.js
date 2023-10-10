const express = require('express')
const router = express.Router();
const {registerController,loginController,testController,emailLink,forgotPasswordController,updateProfileController, getOrderController, getAllOrderController,OrderStatusController} = require('../controllers/authController');
const {requireSignIn,isAdmin} = require('../middleware/authMiddleware');


// making router

// register
router.post('/register',registerController);

// login
router.post('/login', loginController);

// forgot password
router.post('/forgot-password',forgotPasswordController)

router.get('/:id/verify/:token', emailLink);

// test routes
router.get('/test',requireSignIn,isAdmin,testController)

// user protected route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// admin dashboard protected route
router.get("/admin-auth", requireSignIn,isAdmin ,(req, res) => {
    res.status(200).send({ ok: true });
});

router.put('/profile',requireSignIn,updateProfileController);

// to get Order
router.get('/orders',requireSignIn,getOrderController);

// admin orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrderController);

//  orders status
router.put('/orders-status/:orderId',requireSignIn,isAdmin,OrderStatusController);

module.exports = router