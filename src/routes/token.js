"use strict"

const router = require('express').Router()
const Token = require('../controllers/token')
const permission = require('../middlewares/permissions')

router.route('/')
    .get(permission.isAdmin, Token.list)

router.route('/:id')
    .get(permission.isAdmin, Token.read)


module.exports = router