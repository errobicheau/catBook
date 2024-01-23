require('dotenv').config() //require and use .env file
const express = require('express') //require express in server.js
const app = express() //assign express() to app
const mongoose = require('mongoose')
const session = require('express-session')
const connectDB = require('./config/connectDB')
const catRoutes= require('./routes/catRoutes')
const userRoutes = require('./routes/userRoutes')
const PORT = process.env.PORT || 3500
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/userModel')

connectDB() //connect db function called

// MIDDLEWARE //
app.use(express.json()) //NOTE
app.use(express.urlencoded({extended: true})) //assists with form data

app.use(express.static('public')) //express routing for public folder containing static files

//set ejs as the view engine
app.set('view engine', 'ejs')

app.use(session({
    secret: 'this is CatBook',
    resave: false,
    saveUninitialized: false
}))

//turn passport on
//intialize passport session
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next) => {
    res.locals.currentUser = req.user
    next()
})

//ROUTES//
app.use('/', catRoutes)
app.use('/', userRoutes)

//CONNECT TO SERVER, DATABASE//
mongoose.connection.once('open', () => { //once connection is open to database, then server will start
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) //listens for response from server
})

