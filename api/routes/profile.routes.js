const { Router } = require('express')
const { Auth } = require('../controllers')

const router = Router()

router.get('/details', Auth.ProfileCtrl.details)

module.exports = router