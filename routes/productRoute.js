const express=require('express');
const router= express.Router();
const Product = require('../models/productModel');
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controller/productController');

router.get('/',getProducts )
 //Check the item is present in the dataset
router.get('/:id',getProduct )
 
 
 router.post('/',createProduct )
 
 // update a product
 router.put('/:id', updateProduct)
 
 // delete a product
 
 router.delete('/:id',deleteProduct );

 module.exports=router;