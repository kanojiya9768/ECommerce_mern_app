const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//middleware to understand json data comming from request
server.use(express.json());

//cross origin middleware to provide access to all sources 
server.use(cors())

//import models which contains all the collection in it.
const model = require('./index.js')
const product = model.product;


//create new product 
server.post('/product', (req, res) => {
    const newProduct = new product(req.body);
    newProduct.save().then((data) => {
        res.status(201).json("Product Added 😀")
    }).catch((err) => {
        res.status(400).json("Already Exist ⚠️")
    })
})





//get all products
server.get('/product', async (req, res) => {
    const data = await product.find({}).exec();
    res.json(data)
})




//get single product
server.get('/product/:category',async(req,res)=>{
    const category = req.params.category;
    const data = await product.find({category : category});
    res.json(data);
})




//delete product
server.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    await product.findByIdAndDelete(id);
    res.status(200).json("product Deleted 🥹")
})
























//cart collection
const cart = model.cart;

//create new Cart
server.post('/cart', (req, res) => {
    const newCart = new cart(req.body);
    newCart.save().then((data) => {
        res.status(201).json("Product Added To Cart 😀");
    }).catch((err) => {
        res.status(400).json("Already Exist ⚠️");
    })
})




//get all cart products
server.get('/cart', async (req, res) => {
    const cartData = await cart.find({}).exec();
    res.status(200).json(cartData)
})



//remove from cart
server.delete('/cart/:id', async (req, res) => {
    const id = req.params.id;
    await cart.findByIdAndDelete(id);
    res.status(200).json("product Removed 🥲")
})








const path = require('path');
server.use(express.static(path.resolve(__dirname,'dist')))



server.listen(PORT, () => {
    console.log("Server Started..!")
})