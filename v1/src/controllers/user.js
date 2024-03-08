"use strict"


// model de oluşturulan user çağırılır
const User = require('../models/user')
const Token = require('../models/token');
const passwordEnctypt = require('../helper/passwordEnctypt');
const usrMail = require('../helper/registerControl')


module.exports = {

    // user oluşturmak için kullanılacak controller
    create: async (req, res) => {

        const method = req.method
        const id = req.params?.id
        const { name, surname, email, password } = req.body

        // req.body den gelen email bilgisini alarak kayıtlı kullanıcı var mı kontrol et
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {

            res.errorStatusCode = 400
            throw new Error(
                'There is already this email address !'
            )
        }
        else {

            if (password.length >= 6 && password.length <= 10) {

                const data = await User.create(req.body);
                const tokenKey = passwordEnctypt(data._id + Date.now())
                const tokenData = await Token.create({ userId: data._id, token: tokenKey })

                // Kullanıcı başarıyla oluşturuldu, 201 durum kodu ile yanıt ver
                return res.status(201).send({
                    error: false,
                    token: tokenData.token,
                    data,
                    mail: await usrMail(req, 'registerSendMail')  //mail fonksiyon çalıştır
                });

            }
            else {
                res.errorStatusCode = 400
                throw new Error(
                    'Password must be between 6 and 10 characters !'
                )
            }

        }

    },
    list: async (req, res) => {

        const result = await res.getModelList(User)
        const data = result.filter(item => item.name !== 'root')
        res.status(200).send({
            error: false,
            // details: await res.getModelListDetails(User),
            data
        })

    },
    read: async (req, res) => {

        const data = await User.findOne({ _id: req.params.id })
        const tokenData = await Token.findOne({ userId: req.params.id })
        // read işlemlerinde 200 bilgisi döner
        res.status(200).send({
            error: false,
            data,
            tokenData: tokenData
        })
    },
    update: async (req, res) => {

        // { runValidators: true } seçeneği, bir belgeyi güncellerken Mongoose şema validatörlerinin çalıştırılmasını sağlar. 

        const method = req.method
        const id = req.params?.id
        const { name, surname, email, password } = req.body

        if (password !== undefined && password.length >= 6 && password.length <= 10) {
            const data = await User.updateOne({ _id: id }, req.body, { runValidators: true });

            // update işlemlerinde 202 bilgisi döner
            res.status(202).send({
                error: false,
                data,
                newData: await User.findOne({ _id: id }),
                mail: await usrMail(req, 'updateSendMail')  //mail fonksiyon çalıştır
            });
        }
        else if (password === undefined || (password.length >= 6 && password.length <= 10)) {
            const data = await User.updateOne({ _id: id }, req.body, { runValidators: true });

            // Eğer password undefined ise veya uzunluk koşullarını sağlıyorsa, mail gönderme işlemi yapılmaz
            // update işlemlerinde 202 bilgisi döner
            res.status(202).send({
                error: false,
                data,
                newData: await User.findOne({ _id: id }),
            });
        }
        else {
            // password koşulları sağlanmadığında bir hata mesajı döndür
            res.status(400).send({
                error: true,
                message: "Password must be between 6 to 10 characters long",
            });
        }

    },
    delete: async (req, res) => {

        const data = await User.deleteOne({ _id: req.params.id })
        const tokenData = await Token.deleteOne({ userId: req.params.id })
        res.status(data.deletedCount && tokenData.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
            result: "Deleted"
        })
    }



}