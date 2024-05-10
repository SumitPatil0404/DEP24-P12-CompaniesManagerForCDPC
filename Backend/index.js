require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const fs = require('fs')
const cors = require('cors')
const app = express();
const server = createServer(app)
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);



const DB = require('./Components/DataBase/SQLDatabase')
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())

const SendEmail=require('./Components/Common/SendEmail')
app.use(SendEmail)

const SuperUser=require('./Components/SuperUser/Login')
app.use(SuperUser)

const User=require('./Components/Users/Login')
app.use(User)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app