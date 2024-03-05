"use strict"


const User = require('../models/user')
const Token = require('../models/token')
const passwordEnctypt = require('../helper/passwordEnctypt')

module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body

        if (email && password) {

            // kullanıcı adı veya email adresine göre arama yap
            // const user = await User.findOne({ $or: [{ username }, { email }]})

            const user = await User.findOne({ email: email })
            
            if (user && user.password == passwordEnctypt(password)) {

                if (user.isActive) {

                    
                    let tokenData = await User.findOne({ userId: user._id })

                    if (!tokenData) {

                        // simple token oluşturmak için passEncry() fonksiyonuna parametre gönder
                        let tokenKey = passwordEnctypt(user._id + Date.now())
                        tokenData = await Token.create({ userId: user._id, token: tokenKey })
                    }

                    res.send({
                        error: false,
                        token: tokenData.token,
                        user
                    })
                }
                else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            }
            else {

                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password.')
            }
        }
        else {

            res.errorStatusCode = 401
            throw new Error('Please enter username/email and password.')
        }
    }


}