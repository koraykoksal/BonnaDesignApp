"use strict"


const Token = require('../models/token')
const User = require('../models/user')

module.exports = {


    list: async (req, res) => {

        const data = await res.getModelList(Token)

        res.status(200).send({
            error: false,
            data
        })

    },
    read: async (req, res) => {

        const userData = await User.findOne({_id:req.params.id})
        const data = await Token.findOne({ userId: req.params.id })

        res.status(200).send({
            error:false,
            data,
            userData
        })
    }

}