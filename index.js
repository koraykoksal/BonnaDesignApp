"use strict"



const express = require('express')
const app = express()
const cors = require('cors')

//? dotenv
require('dotenv')

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


app.all('/', (req, res) => {
    res.status(200).send({

        response: {
            error: false,
            result: "Welcome to Bonna Design Searching API"
        }
    })
})


//* ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log('server running via port ', PORT))