//Set up database structure based on what kind of information you want to store in your database

//require use of mongoose package which enables schemas
const mongoose = require('mongoose')

//setting up schema for cat object(s) in database
const catSchema = new mongoose.Schema({
    name: String,
    age: Number, 
    favoriteFood: String,
    funFact: String,
    image: String
})

//remember to export mongoose model to be used in other locations
module.exports = mongoose.model('Cat', catSchema)