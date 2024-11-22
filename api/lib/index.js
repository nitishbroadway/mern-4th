const jwt = require('jsonwebtoken')
const { User } = require('../models')

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

module.exports = { validationError, errorMsg, auth }