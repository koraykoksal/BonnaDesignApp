"use strict"


const crypto = require('node:crypto'),
keyCode = process.env.SECRET_KEY,
loopCount = process.env.LOOP_COUNT,
charCount = process.env.CHAR_COUNT,
encType = process.env.ENC_TYPE

module.exports=function(password){
    return crypto.pbkdf2Sync(password,keyCode,loopCount,charCount,encType).toString('hex')
}

