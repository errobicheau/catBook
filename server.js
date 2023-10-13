require('dotenv').config() //require and use .env file
const express = require('express') //require express password in server.js
const app = express() //assign express() to app
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const catRoutes= require('./routes/catRoutes')
const PORT = process.env.PORT || 3500 // checks if port exists in .env file, if not it uses PORT 3500.

connectDB() //connect db function called

// MIDDLEWARE //
app.use(express.json()) //NOTE
app.use(express.urlencoded({extended: true})) //assists with form data

app.use(express.static('public')) //express routing for public folder containing static files

//set ejs as the view engine
app.set('view engine', 'ejs')

//ROUTES//
app.use('/', catRoutes)

//CONNECT TO SERVER, DATABASE//
mongoose.connection.once('open', () => { //once connection is open to database, then server will start
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) //listens for response from server
})

