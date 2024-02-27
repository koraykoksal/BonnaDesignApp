"use strict"

const mongosee = require('mongoose')

const dbConnection=function(){

    mongosee.connect(process.env.MONGODB)
    .then(()=>console.log("* DB Connected *"))
    .catch(()=>console.log("*! DB Connection Error !*"))
}

module.exports={
    mongosee,
    dbConnection
}