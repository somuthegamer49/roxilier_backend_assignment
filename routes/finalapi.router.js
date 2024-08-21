const express = require("express");
const router = express.Router();
const axios = require("axios");

router.route("/").get(async (req, res) => {
  try {
    const piebar = await axios.get("http://localhost:5000/piecategorybar");
    const datapie = piebar.data;
    const pricerangebar = await axios.get("http://localhost:5000/pricerangebar");
    const datapricerange = pricerangebar.data;
    const totalsale = await axios.get("http://localhost:5000/totalsale");
    const datatotalsale = totalsale.data;
    const soldfalse = await axios.get("http://localhost:5000/soldfalse");
    const datasoldfalse = soldfalse.data;
    const soldtrue = await axios.get("http://localhost:5000/soldtrue");
    const datasoldtrue = soldtrue.data;
    const stats = await axios.get("http://localhost:5000/statistics");
    const datastats = stats.data;

    const response = {
        piechart: datapie,
        pricerange: datapricerange,
        totalsale:datatotalsale,
        notsold:datasoldfalse,
        gotsold:datasoldtrue,
        alldata:datastats

    }
    res.json(response)
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
