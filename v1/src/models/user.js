"use strict"

const {mongoose} = require('../configs/dbConnections')
const passwordEncrpy = require('../helper/passwordEnctypt')

// kullanıcı kaydı için önce şema bilgisi oluşturulur

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Incorrect email address !'],
        //! yukarıdaki match işlemi aşağıdaki validate işleminin aynısını yapıyor
        // validate: [
        //     (email) => {
        //         const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        //         return emailRegexCheck.test(email)
        //     }, 'Email type is incorrect'
        // ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        set:(password)=>passwordEncrpy(password)
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isController:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{collection:'users',timeseries:true})



module.exports = mongoose.model('User',UserSchema)
