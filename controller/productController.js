const Product= require('../models/productModel')

//express-async-handler is a middleware for handling exceptions inside df async express routes and passing to express error handlers.
//For the installation run, 'npm install --save express-async-handler' command
const asyncHandler = require('express-async-handler');

//Get all Products
const getProducts =asyncHandler(async(req, res) => {
     try {
         const products = await Product.find({});
         res.status(200).json(products);
     } catch (error) {
         res.status(500).json({message: error.message})
     }
 })
//Get a single product
 const getProduct = asyncHandler(async(req, res) =>{
     try {getProduct
         const {id} = req.params;
         const product = await Product.findById(id);
         res.status(200).json(product);
     } catch (error) {
          res.status(500);
          throw new Error(error.message);
         //res.status(500).json({message: error.message})
     }
 });
//Creat a product
 const createProduct = asyncHandler(async(req, res) => {
     try {
         const product = await Product.create(req.body)
         res.status(200).json(product);
         
     } catch (error) {
          res.status(500);
          throw new Error(error.message);
     }
 });

 //update a product
 const updateProduct = asyncHandler(async(req, res) => {
     try {
         const {id} = req.params;
         const product = await Product.findByIdAndUpdate(id, req.body);
         // we cannot find any product in database
         if(!product){
             return res.status(404).json({message: `cannot find any product with ID ${id}`})
         }
         const updatedProduct = await Product.findById(id);
         res.status(200).json(updatedProduct);
         
     } catch (error) {
          res.status(500);
          throw new Error(error.message);
     }
 });

 //Delete a product
 const deleteProduct = asyncHandler(async(req, res) =>{
     try {
         const {id} = req.params;
         const product = await Product.findByIdAndDelete(id);
         if(!product){
             return res.status(404).json({message: `cannot find any product with ID ${id}`})
         }
         res.status(200).json(product);
         
     } catch (error) {
          res.status(500);
          throw new Error(error.message);
     }
 });

 module.exports={
     getProducts,
     getProduct,
     createProduct,
     updateProduct,
     deleteProduct
 }