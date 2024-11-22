const { errorMsg, validationError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class ProfileCtrl {
    details = async (req, res, next) => {
        res.send(req.user)
    }
    
    update = async (req, res, next) => {
        try {
            const {name, phone, address} = req.body

            await User.findByIdAndUpdate(req.user._id, {name, phone, address})

            res.send({
                message: 'Profile updated'
            })
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    password = async (req, res, next) => {
        try {
            const {oldPassword, password, confirmPassword} = req.body

            if(password == confirmPassword) {
                const user = await User.findById(req.user._id).select('+password')

                if(bcrypt.compareSync(oldPassword, user.password)) {
                    const hashed = bcrypt.hashSync(password)

                    await User.findByIdAndUpdate(user._id, {password: hashed})

                    res.send('Password updated.')
                } else {
                    validationError(next, {
                        oldPassword: 'The password is incorrect.'
                    })
                }
            } else {
                validationError(next, {
                    password: 'The password is not confirmed.'
                })
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new ProfileCtrl