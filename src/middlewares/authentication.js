"use strict"

const User = require('../models/user')
const Token = require('../models/token')

module.exports=async (req,res,next)=>{


    // headers da gönderilen token bilgisini yakalar
    const auth = req.headers?.authorization || null // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if(tokenKey && tokenKey[0] == 'Bearer'){
        const tokenData = await Token.findOne({token:tokenKey[1]})
        // token bilgisi doğru ise req.user tarafına veri gönderilir controller tarafında işlem devam ettirilir
        if(tokenData) req.user = await User.findOne({_id:tokenData.userId})
    }

    next()

}
