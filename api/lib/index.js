const jwt = require('jsonwebtoken')
const { User } = require('../models')
const multer = require('multer')

const validationError = (next, errors) => {
    next({
        message: 'There seems to be some validation error.',
        status: 422,
        errors,
    })
}

const errorMsg = (next, error) => {
    console.log(error)

    if ('errors' in error) {
        let errors = {}

        for (let k in error.errors) {
            errors = {
                ...errors,
                [k]: error.errors[k].message,
            }
        }

        validationError(next, errors)
    } else if ('code' in error && error.code == 11000) {
        validationError(next, {
            email: 'The email is already registrered.'
        })
    } else {
        next({
            message: 'Unable to process request',
        })
    }
}

const auth = async (req, res, next) => {
    try {
        if('authorization' in req.headers) {
            const token = req.headers.authorization.split(' ').pop()

            const {uid} = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(uid)

            if(user) {
                if(user.status) {
                    req.user = user

                    next()
                } else {
                    next({
                        message: 'User deactivated.',
                        status: 403,
                    })
                }
            } else {
                next({
                    message: 'Token invalid.',
                    status: 401,
                })
            }
        } else {
            next({
                message: 'Token missing.',
                status: 401
            })
        }
    } catch(error) {
        next({
            message: 'Token invalid.',
            status: 401,
        })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role == 'Admin') {
        next()
    } else {
        next({
            message: 'Access denied',
            status: 403,
        })
    }
}

const notFoundError = (next, name) => {
    next({
        message: `${name} not found`,
        status: 404,
    })
}

const upload = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads')
        },
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()

            const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${ext}`

            cb(null, filename)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new Error('Invalid image file.'))
        }
    }
})

module.exports = { validationError, errorMsg, auth, adminOnly, notFoundError, upload }