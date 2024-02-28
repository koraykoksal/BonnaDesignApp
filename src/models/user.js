"use strict"

const mongosee = require('mongoose')
const passwordEncrpy = require('../helper/passwordEnctypt')

// kullanıcı kaydı için önce şema bilgisi oluşturulur

const UserSchema = new mongosee.Schema({

    name: {
        type: String,
        trim: true,
        require: true,
    },
    surname: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: [true, 'Email field must be required'],
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
        require: true,
        trim: true,
        minlength:6,
        maxlength:10,
        set:(password)=>passwordEncrpy(password)
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isController:{
        type:Boolean,
        default:false
    }
},{collection:'users',timeseries:true})



module.exports = mongosee.model('User',UserSchema)
