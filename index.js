const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./dbconfig')
const Insert = require('./routes/stats.router')
const Statistics = require('./routes/statistics.router')
const Soldtrue = require('./routes/statssoldtrue.router')
const Soldfalse = require('./routes/statssoldfalse.router')
const Totalsale = require('./routes/totalsale.router')
const Pricebar = require('./routes/pricebar.router')
const Piebar = require('./routes/piebar.router')
const Finalapi = require('./routes/finalapi.router')

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 5000

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/insertdata",Insert)
app.use("/statistics",Statistics)
app.use("/soldtrue",Soldtrue)
app.use("/soldfalse",Soldfalse)
app.use("/totalsale",Totalsale)
app.use("/pricerangebar",Pricebar)
app.use("/piecategorybar",Piebar)
app.use("/finalapi",Finalapi)

app.listen(PORT,async()=>{
    await connectDB()
    console.log("Server is up and running "+ PORT)
})