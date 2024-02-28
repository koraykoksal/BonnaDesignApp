"use strict"

// express den Router fonksiyonu çağırılır
const router = require('express').Router()
// controller dan user çağırılır
const user = require('../controllers/user')


// ana dizin talebinde controllerdan read ve create işlemlerini çalıştır
router.route('/')
.get(user.read)
.post(user.create)


router.route('/:id')
.get(user.read)
.put(user.update)
.patch(user.update)
.delete(user.delete)

module.exports = router


