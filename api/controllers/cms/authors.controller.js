const { errorMsg, notFoundError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class AuthorsCtrl {
    index = async (req, res, next) => {
        try {
            const authors = await User.find({role: 'Author'})

            res.send(authors)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address, status } = req.body

            if (password == confirmPassword) {
                const hash = bcrypt.hashSync(password)

                await User.create({ name, email, phone, address, password: hash, status })

                res.status(201).send({
                    message: 'Author added.',
                })
            } else {
                validationError(next, {
                    password: 'The password is not confirmed.',
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const author = await User.findById(id)

            if(author) {
                res.send(author)
            } else {
                notFoundError(next, 'Author')
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params

            const author = await User.findById(id)

            if (author) {
                const { name, phone, address, status } = req.body

                await User.findByIdAndUpdate(id, {name, phone, address, status})

                res.send({
                    message: 'Author, updated',
                })
            } else {
                notFoundError(next, 'Author')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const author = await User.findById(id)

            if (author) {
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'Author deleted.'
                })
            } else {
                notFoundError(next, 'Author')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new AuthorsCtrl