const express = require("express");
const router = express.Router();
const axios = require("axios");
const Products = require("../model/products");

router.route("/").get(async (req, res) => {
  try {
    const data = await Products.find({});
    const search = req.query;
    const pricerange = [0, 101, 201, 301, 401, 501, 601, 701, 801, 901];
    const month = [
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
    const pricedisplay = [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ];
    if (data) {
      let response = {
        range: String,
        items: Number,
      };
      let items_month = 0;
      let totalprice_month = 0;
      let items = 0;
      let totalprice = 0;
      let check =false
      data.forEach((item) => {
        if (Object.keys(search)[0] === month[item.dateOfSale.getMonth()]) {
          ++items_month;
          totalprice_month += item.price;
          check=true
        } else {
          ++items;
          totalprice += item.price;
        }
      });
      for (let i = pricerange.length - 1; i >= 0; i--) {
        if(check && totalprice_month > pricerange[i]){
            response.range=pricedisplay[i]
            response.items=items_month
            break;
        }
        else if(!check && totalprice > pricerange[i]) {
            response.range=pricedisplay[i]
            response.items=items
            break;
        }
      }
      res.send(response)
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
