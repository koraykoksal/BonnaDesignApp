"use strict"

const mongoose = require('mongoose')

const dbConnection=function(){

    mongoose.connect(process.env.MONGODB)
    .then(()=>console.log("* DB Connected *"))
    .catch(()=>console.log("*! DB Connection Error !*"))
}

module.exports={
    mongoose,
    dbConnection
}