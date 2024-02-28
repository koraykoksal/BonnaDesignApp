"use strict"


// model de oluşturulan user çağırılır
const User = require('../models/user')

module.exports = {

    // user oluşturmak için kullanılacak controller
    create: async (req, res) => {

        const data = await User.create(req.body, { runValidators: true })
        // create işlemlerinde 201 bilgisi döner
        res.status(201).send({
            error: false,
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