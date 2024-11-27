const { errorMsg, notFoundError } = require("../../lib")
const { Category } = require("../../models")

class CategoriesCtrl {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, status } = req.body

            await Category.create({ name, status })

            res.status(201).send({
                message: 'Category added.',
            })
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const category = await Category.findById(id)

            if(category) {
                res.send(category)
            } else {
                notFoundError(next, 'Category')
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                const { name, status } = req.body

                await Category.findByIdAndUpdate(id, {name, status})

                res.send({
                    message: 'Category, updated',
                })
            } else {
                notFoundError(next, 'Category')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                await Category.findByIdAndDelete(id)

                res.send({
                    message: 'Category deleted.'
                })
            } else {
                notFoundError(next, 'Category')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new CategoriesCtrl