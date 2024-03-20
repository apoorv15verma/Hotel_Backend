const express = require('express');
const app = express();

const db = require("./db")


const bodyParser = require('body-parser')
app.use(bodyParser.json())

const personRoutes = require("./Routes/personRoutes");
app.use('/person',personRoutes)

const menuRoutes = require("./Routes/menuRoutes");
app.use('/menuItems',menuRoutes)

app.get('/', function (req, res) {
    res.send('welcome to the hotel ')
})




app.listen(8000, () => {
    console.log(`listening at port no 8000`)
})
