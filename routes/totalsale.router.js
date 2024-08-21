const express = require("express");
const router = express.Router();
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
      let totalsale = [];
      let sum = 0;
      let sum_month = 0;
      data.forEach((item) => {
        if (Object.keys(search)[0] === month[item.dateOfSale.getMonth()]) {
          sum_month += item.price;
          totalsale.push(item);
        } else {
          sum += item.price;
          totalsale.push(item);
        }
      })
      console.log()
      sum_month > 0 ? res.json(sum_month) : res.json(sum)
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
