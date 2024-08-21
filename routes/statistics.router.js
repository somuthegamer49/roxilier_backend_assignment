const express = require('express')
const router = express.Router()
const Products = require("../model/products")

router.route('/').get(async(req,res)=>{
    let data = await Products.find({})
    const search = req.query
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    try{
        let items = []
        let check=false
        let check1=false
        let check2=false
        let check3=false
        data.forEach((item)=>{
            if (Object.keys(search)[0] === months[item.dateOfSale.getMonth()]) {
                items.push(item)
                check=true
            }
        })
        data.forEach((item)=>{
            if (!check && Number(Object.keys(search)[0]) === item.price) {
                items.push(item)
                check1=true
            }
        })
        data.forEach((item)=>{
            if (!check1 && !check && String(Object.keys(search)[0]) === item.description) {
                items.push(item)
                check2=true
            }
        })
        data.forEach((item)=>{
            if (!check1 && !check && !check2 && String(Object.keys(search)[0]) === item.title) {
                items.push(item)
                check3=true
            }
        })
        data.forEach((item)=>{
            if (!check1 && !check && !check2 && !check3) {
                items.push(item)
            }
        })
        res.json(items)
    }
    catch(err){
      console.log(err)
    }
})

module.exports = router
