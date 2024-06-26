const express = require('express');
const app = express();
const path = require("path");
const connectionDB = require('./database/db'); 
const registerLoginRouter=require('./routes/createUser')
const displayData=require('./routes/DisplayData')
const order=require('./routes/OrderData')
const cors=require('cors')

app.use(cors())

const Port = process.env.PORT || 3000;

app.use(express.json())
app.use(registerLoginRouter)
app.use(displayData)
app.use(order)


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


connectionDB().then(()=>{
    app.listen(Port, () => {
        console.log(`The Server Is Run on Port : ${Port}`)
    });
})

module.exports = app;

