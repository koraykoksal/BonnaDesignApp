"use strict"


const { mongoose } = require('../configs/dbConnections')


const TokenSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    token: {
        type: String,
        trim: true,
        required: true,
        index: true
    }

}, { collection: 'tokens', timestamps: true })


module.exports = mongoose.model('Token', TokenSchema)




