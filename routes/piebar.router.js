const express = require("express");
const router = express.Router();
const axios = require("axios");
const Products = require("../model/products");

router.route("/").get(async (req, res) => {
  try {
    const data = await Products.find({});
    const search = req.query;
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
    if (data) {
      let response1 = {};
      let response2 = {};
      let check = false;
      data.forEach((item) => {
        let items_month = 0;
        let items = 0;
        if (Object.keys(search)[0] === month[item.dateOfSale.getMonth()]) {
          let cat = item.category;
          response2[cat] = (response2[cat]+1) || 1 ;
          check = true;
        } else {
          let cat = item.category;
          response1[cat] = (response1[cat]+1) || 1 ;
        }
      });
      check ? res.json(response2) : res.json(response1);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
