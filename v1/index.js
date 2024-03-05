"use strict"



const express = require('express')
const app = express()
const cors = require('cors')
const { dbConnection } = require('./src/configs/dbConnections') // db import

//? dotenv
// .config() env dosyası içerisindeki değişlenleri process.env üzerinden erişilebilir hale getiriyor.
require('dotenv').config()

//? async error
require('express-async-errors')

//? accept json
// tüm talepler json formatında çalışır
app.use(express.json())


// gelen tüm isteklerin kök dizinine izin verir
app.use(cors())

// veya belirli bir kökene izin vermek için
app.use(cors({
    origin: ['http://localhost:3000', 'https://bonna-touch.vercel.app']
}));


// DB Connection function
dbConnection()

// API TALEBI GELDIGI ZAMAN AUTHORIZATION ISLEMI YAP
app.use(require('./src/middlewares/authentication'))

// FIND AND SEARCH
app.use(require('./src/middlewares/findSearchSortPage'))






app.all('/', (req, res) => {
    res.status(200).send({

        response: {
            error: false,
            result: "Welcome to Bonna Design Searching API"
        }
    })
})


// user işlemleri için API adresi
app.use('/api/users',require('./src/routes/user'))
app.use('/api/auth',require('./src/routes/auth'))
app.use('/api/tokens',require('./src/routes/token'))



//* ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server running via port ${PORT}`))