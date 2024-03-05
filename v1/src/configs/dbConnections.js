"use strict"

const mongoose = require('mongoose')

const dbConnection=function(){

    mongoose.connect(process.env.MONGODB)
    .then(()=>console.log("* DB Connected *"))
    .catch((err)=>console.log("*! DB Connection Error !*",err))
}

module.exports={
    mongoose,
    dbConnection
}