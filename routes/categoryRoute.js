const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const {createCategoryController,updateCategoryController,categoryControlller,singleCategoryController,deleteCategoryController} = require('../controllers/categoryController')

const router = express();

// create category
router.post('/create-category',requireSignIn,isAdmin, createCategoryController);

// update categories
router.put('/update-category/:id', requireSignIn,isAdmin,updateCategoryController);

// get all categories
router.get('/get-category',categoryControlller);

// get single categories
router.get('/single-category/:slug',singleCategoryController);

// deleted categories
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

module.exports = router;