"use strict"

// express den Router fonksiyonu çağırılır
const router = require('express').Router()
// controller dan user çağırılır
const User = require('../controllers/user')
const permission = require('../middlewares/permissions')
const test = require('../middlewares/test')


// ana dizin talebinde controllerdan read ve create işlemlerini çalıştır
router.route('/')
    .get(User.list)
    .post(User.create)


router.route('/:id')
    .get(User.read)
    .put(User.update)
    .patch(User.update)
    .delete(User.delete)


module.exports = router


