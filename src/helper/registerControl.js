"use strict"


const nodemailer = require('nodemailer');
const User = require('../models/user')
const passEncry = require('./passwordEnctypt')
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.NODEMAILER_PASS
    }
});


module.exports = async function (req, status) {

    const method = req.method
    const id = req.params?.id
    const { name, surname, email, password } = req.body // update işleminde gönderilen parola bilgisini yakala


    //! account update olan kullanıcının req.params.id den kullanıcı bilgisi çekilir name,surname,email bilgisi kullanılır
    if (status == 'updateSendMail') {

        const userData = await User.findById(id);

        // kullanıcının body den gönderdiği parola ile sistemde kayıtlı olan parola bilgisi karşılaştırılır
        // `bcrypt.compare` fonksiyonu ile şifreyi karşılaştır
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {

            // mailOption oluşturulurken userInfo'dan alınan bilgileri kullan
            const mailOption = {
                from: {
                    name: 'Bonna Design Search App',
                    address: process.env.MAIL_FROM,
                },
                to: userData.email, // Alıcı adresi olarak userData'dan alınan email'i kullan
                subject: 'About User Account Update',
                text: `
                Dear Sir or Madam,

                Your account has been updated. Please check the information below.

                Update Information:
                - Name: ${userData.name}
                - Surname: ${userData.surname}
                - Email: ${userData.email}
                - New Password: ${password}
                - Updated Date: ${new Date()}

                Don't share this information with other people please!

                BONNA SOFTWARE TEAM
            `
            };

            transporter.sendMail(mailOption)
                .then(response => {
                    console.log('Email sent:', response);
                })
                .catch(err => {
                    console.error('Error sending email:', err);
                });
        }

    }
    //! yeni kullanıcının name,surname,email bilgileri req.body den alınır
    else if (status == 'registerSendMail') {

        // mailOption oluşturulurken userInfo'dan alınan bilgileri kullan
        const mailOption = {
            from: {
                name: 'Bonna Design Search App',
                address: process.env.MAIL_FROM,
            },
            to: email, // Alıcı adresi olarak userData'dan alınan email'i kullan
            subject: 'About Register Information',
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

            BONNA SOFTWARE TEAM
        `
        };

        transporter.sendMail(mailOption)
            .then(response => {
                console.log('Email sent:', response);
            })
            .catch(err => {
                console.error('Error sending email:', err);
            });


    }


}