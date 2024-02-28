"use strict"


// model de oluşturulan user çağırılır
const User = require('../models/user')

module.exports = {

    // user oluşturmak için kullanılacak controller
    create: async (req, res) => {

        const { email } = req.body;

        // Önce email adresi ile kayıtlı bir kullanıcı olup olmadığını kontrol et
        //? user model de email için bir regex kuralı mevcut bunun için collection bilgisi girilir
        const existingUser = await User.findOne({ email: email }) //.collation({ locale: 'en' }).exec();

        if (existingUser) {
            // Eğer kullanıcı varsa, bir hata mesajı döndür
            return res.status(400).send({
                error: true,
                message: 'There is already this email address.'
            });
        }
        else {

            const data = await User.create(req.body);

            // Kullanıcı başarıyla oluşturuldu, 201 durum kodu ile yanıt ver
            return res.status(201).send({
                error: false,
                data
            });
        }


    },
    list: async (req, res) => {

        console.log("res: ",res)
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            // details: await res.getModelListDetails(User),
            data
        })

    },
    read: async (req, res) => {

        const data = await User.findOne({ _id: req.params.id })
        // read işlemlerinde 200 bilgisi döner
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {

        // { runValidators: true } seçeneği, bir belgeyi güncellerken Mongoose şema validatörlerinin çalıştırılmasını sağlar. 
        const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        // update işlemlerinde 202 bilgisi döner
        res.status(202).send({
            error: false,
            data
        })
    },
    delete: async (req, res) => {

        const data = await User.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }



}