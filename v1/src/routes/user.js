"use strict"

// express den Router fonksiyonu çağırılır
const router = require('express').Router()
// controller dan user çağırılır
const User = require('../controllers/user')
const permission = require('../middlewares/permissions')


// ana dizin talebinde controllerdan read ve create işlemlerini çalıştır
router.route('/')
    .get(permission.isLogin,User.list)
    .post(User.create)


router.route('/:id')
    .get(permission.isController,User.read)
    .put(permission.isController,User.update)
    .patch(permission.isController,User.update)
    .delete(permission.isController,User.delete)


module.exports = router


