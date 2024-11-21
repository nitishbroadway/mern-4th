const { errorMsg, validationError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

class LoginCtrl {
    login = async (req, res, next) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    if(user.status) {
                        const token = jwt.sign({
                            uid: user._id,
                            iat: Math.floor(Date.now() / 1000),
                            exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
                        }, process.env.JWT_SECRET)

                        res.send({token})
                    } else {
                        validationError(next, {
                            email: 'The account is currently deactivated.',
                        })
                    }
                } else {
                    validationError(next, {
                        password: 'The password is incorrect.',
                    })
                }
            } else {
                validationError(next, {
                    email: 'The given email is not registered.',
                })
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new LoginCtrl