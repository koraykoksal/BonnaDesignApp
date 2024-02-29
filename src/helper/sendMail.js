"use strict"

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.NODEMAILER_PASS
    }

});


module.exports=function(info){

    const {name,surname,email,password} = info


}



