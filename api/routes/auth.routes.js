const { Router } = require('express')
const RegisterCtrl = require('../controllers/auth/register.controller')

const router = Router()

router.post('/register', RegisterCtrl.register)

module.exports = router