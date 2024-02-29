"use strict"


// model de oluşturulan user çağırılır
const User = require('../models/user')
const Token = require('../models/token');
const passwordEnctypt = require('../helper/passwordEnctypt');

module.exports = {

    // user oluşturmak için kullanılacak controller
    create: async (req, res) => {

        const data = await User.create(req.body);

        const tokenKey = passwordEnctypt(data._id + Date.now())
        const tokenData = await Token.create({ userId: data._id, token: tokenKey })

        // Kullanıcı başarıyla oluşturuldu, 201 durum kodu ile yanıt ver
        return res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        });

    },
    list: async (req, res) => {

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
            data,
            newData: await User.findOne({ _id: req.params.id })
        })

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