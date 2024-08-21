const express = require('express')
const router = express.Router()
const axios = require('axios')
const Products = require("../model/products")

router.route('/').get(async(req,res)=>{
    try{
        const items = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const data = items.data
        const products = Products.insertMany(data)
        res.json(products)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router
