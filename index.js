const express = require('express');
const app = express();

const db = require("./db")
require('dotenv').config();

const PORT =process.env.PORT || 8000;


const bodyParser = require('body-parser')
app.use(bodyParser.json())

// middleware
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} request made to: ${req.originalURL}`)
    next();
}

app.get('/',logRequest, function (req, res) {
    res.send('welcome to the hotel ')
})

const personRoutes = require("./Routes/personRoutes");
app.use('/person',personRoutes)

const menuRoutes = require("./Routes/menuRoutes");
app.use('/menuItems',menuRoutes)






app.listen(PORT, () => {
    console.log(`listening at port no 8000`)
})
