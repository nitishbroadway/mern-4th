const { Router } = require('express')
const RegisterCtrl = require('../controllers/auth/register.controller')
const LoginCtrl = require('../controllers/auth/login.controller')

const router = Router()

router.post('/register', RegisterCtrl.register)

router.post('/login', LoginCtrl.login)

module.exports = router