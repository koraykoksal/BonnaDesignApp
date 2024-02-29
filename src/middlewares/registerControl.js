"use strict"


const nodemailer = require('nodemailer');
const User = require('../models/user')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.NODEMAILER_PASS
    }
});

module.exports = async (req, res, next) => {

    const method = req.method
    const id = req.params.id
    const { name, surname, email, password } = req.body


    const mailOptions = {
        from: {
            name: 'Bonna Design Search App',
            address: process.env.MAIL_FROM,
        },
        to: email,
        subject: id ? 'About User Information Update ' : 'About Register Information',
        text: id ?
            `
            Dear Sir or Madam,

            Updated your account. Please check below information.

            Register Information:
            - Name: ${name}
            - Surname: ${surname}
            - Email: ${email}
            - New Password: ${password}
            - Updated Date: ${new Date()}

            Don't share information with other people please !

            BONNA

            
        `
            :
            `
            Dear Sir or Madam,

            Thank you for register application.

            Register Information:
            - Name: ${name}
            - Surname: ${surname}
            - Email: ${email}
            - Password: ${password}
            - Created Date: ${new Date()}

            Don't share information with other people please !

            BONNA
        `
    };


    if (method == 'POST' && name && surname && email && password) {

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {

            res.errorStatusCode = 403
            throw new Error('There is already this email address.')

        }
        else {

            if (password.length >= 6 && password.length <= 10) {

                transporter.sendMail(mailOptions).then(response => {
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
    else if ((method == 'PUT' || method == 'PATCH') && password && id) {

        transporter.sendMail(mailOptions).then(response => {
            console.log('Email sent:', response);
            next();
        }).catch(err => {
            console.error('Error sending email:', err);
            next(); // Hata ile bir sonraki middleware'e geç
        });

    }
    else {
        next()
    }



}
