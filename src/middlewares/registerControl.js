"use strict"


const nodemailer = require('nodemailer');
const User = require('../models/user')
const passEncry = require('../helper/passwordEnctypt')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.NODEMAILER_PASS
    }
});

module.exports = async (req, res, next) => {

    const method = req.method
    const id = req.params?.id
    const { name, surname, email, password } = req.body


    const registerForUsers = {
        from: {
            name: 'Bonna Design Search App',
            address: process.env.MAIL_FROM,
        },
        to: `${email}`,
        subject: 'About New Register Information',
        text: `
        Dear Sir or Madam,

        Thank you for register our application.

        Register Information:
        - Name: ${name}
        - Surname: ${surname}
        - Email: ${email}
        - Password: ${password}
        - Created Date: ${new Date()}

        Don't share this information with other people please!

        BONNA
        `
    }


    const updateForUsers = {
        from: {
            name: 'Bonna Design Search App',
            address: process.env.MAIL_FROM,
        },
        to: `${email}`,
        subject: 'About User Information Update',
        text: `
        Dear Sir or Madam,

        Your account has been updated. Please check the information below.

        Register Information:
        - Name: ${name}
        - Surname: ${surname}
        - Email: ${email}
        - New Password: ${password}
        - Updated Date: ${new Date()}

        Don't share this information with other people please!

        BONNA
        `
    }




    if (method == 'POST' && name && surname && email && password) {

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {

            res.errorStatusCode = 403
            throw new Error('There is already this email address.')

        }
        else {

            if (password.length >= 6 && password.length <= 10) {

                transporter.sendMail(registerForUsers).then(response => {
                    console.log('Email sent:', response);
                    next();
                }).catch(err => {
                    console.error('Error sending email:', err);
                    next(); // Hata ile bir sonraki middleware'e geç
                });
            }
            else {
                res.errorStatusCode = 403
                throw new Error('Password must be between 6 and 10 characters.')
            }
        }
    }
    else if ((method == 'PUT' || method == 'PATCH') && password) {

        if (password !== passEncry(password)) {

            transporter.sendMail(updateForUsers).then(response => {
                console.log('Email sent:', response);
                next();
            }).catch(err => {
                console.error('Error sending email:', err);
                next(); // Hata ile bir sonraki middleware'e geç
            });
        }
    }
    else {
        next()
    }



}
