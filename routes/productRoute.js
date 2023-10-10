const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const {upload} = require('../middleware/uploadImageMiddleware')
const {creatBaseController, updateBaseController, singleBaseController, getBaseController, deleteBaseController, createSauceController, updateSauceController, getSauceController, singleSauceController, deleteSauceController, createCheeseController, updateCheeseController, getCheeseController, singleCheeseController, deleteCheeseController, createVeggiesController, updateVeggiesController, getVeggiesController, singleVeggiesController, deleteVeggiesController, createProductController, getProductController,getSingleProductController,deleteProductController,updateProductController,productFilterController, productCountController, productListController,relatedProductController,productCategoryController, singleBaseByIdController,} = require('../controllers/productController');

const router = express();


router.post('/create-pizzaBase',requireSignIn,isAdmin,creatBaseController);
router.put('/update-pizzaBase/:id',requireSignIn,isAdmin,updateBaseController);
router.get('/get-pizzaBase',getBaseController);
router.get('/get-singleBase/:name',singleBaseController);
router.get('/get-singleBaseId/:id',singleBaseByIdController);
router.delete('/delete-pizzaBase/:id',deleteBaseController);

router.post('/create-pizzaSauce',requireSignIn,isAdmin,createSauceController);
router.put('/update-pizzaSauce/:id',requireSignIn,isAdmin,updateSauceController);
router.get('/get-pizzaSauce',getSauceController);
router.get('/get-singleSauce/:name',singleSauceController);
router.delete('/delete-pizzaSauce/:id',deleteSauceController);

router.post('/create-pizzaCheese',requireSignIn,isAdmin,createCheeseController);
router.put('/update-pizzaCheese/:id',requireSignIn,isAdmin,updateCheeseController);
router.get('/get-pizzaCheese',getCheeseController);
router.get('/get-singleCheese/:name',singleCheeseController);
router.delete('/delete-pizzaCheese/:id',deleteCheeseController);

router.post('/create-pizzaVeggies',requireSignIn,isAdmin,createVeggiesController);
router.put('/update-pizzaVeggies/:id',requireSignIn,isAdmin,updateVeggiesController);
router.get('/get-pizzaVeggies',getVeggiesController);
router.get('/get-singleVeggies/:name',singleVeggiesController);
router.delete('/delete-pizzaVeggies/:id',deleteVeggiesController);


// =============== Product api ================== //

router.post('/create-product',requireSignIn,isAdmin,upload.single("photo"),createProductController);
router.get('/get-product',getProductController);
router.get('/get-product/:slug',getSingleProductController);
router.delete('/delete-product/:id',deleteProductController);
router.put('/update-product/:id',requireSignIn,isAdmin,updateProductController);
router.post('/product-filter',productFilterController);
// product count
router.get('/product-count',productCountController);
router.get("/product-list/:page", productListController);
router.get('/relate-product/:pid/:cid',relatedProductController);
router.get('/product-category/:slug',productCategoryController);




module.exports = router