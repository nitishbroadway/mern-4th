const { Router } = require('express')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')
const cmsRoutes = require('./cms')
const frontRoutes = require('./front.routes')
const { auth } = require('../lib')

const router = Router()

router.use('/auth', authRoutes)

router.use('/profile', auth, profileRoutes)

router.use('/cms', auth, cmsRoutes)

router.use(frontRoutes)

module.exports = router