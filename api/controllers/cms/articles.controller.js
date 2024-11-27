const { errorMsg, notFoundError } = require("../../lib")
const { Article } = require("../../models")

class ArticlesCtrl {
    index = async (req, res, next) => {
        try {
            const articles = await Article.find()

            res.send(articles)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, content, categoryId, status } = req.body

            const image = req.file?.filename || null

            await Article.create({ name, content, categoryId, status, image })

            res.status(201).send({
                message: 'Article added.',
            })
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const article = await Article.findById(id)

            if(article) {
                res.send(article)
            } else {
                notFoundError(next, 'Article')
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if (article) {
                const { name, status } = req.body

                await Article.findByIdAndUpdate(id, {name, status})

                res.send({
                    message: 'Article, updated',
                })
            } else {
                notFoundError(next, 'Article')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if (article) {
                await Article.findByIdAndDelete(id)

                res.send({
                    message: 'Article deleted.'
                })
            } else {
                notFoundError(next, 'Article')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new ArticlesCtrl