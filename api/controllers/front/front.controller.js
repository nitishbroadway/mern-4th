const { errorMsg } = require("../../lib")
const { Article, Category, Comment } = require("../../models")

class FrontCtrl {
    articles = async (req, res, next) => {
        try {
            const articles = await Article.find({status: true})

            res.send(articles)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    categories = async (req, res, next) => {
        try {
            const categories = await Category.find({ status: true })

            res.send(categories)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    articleById = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if (article) {
                res.send(article)
            } else {
                notFoundError(next, 'Article')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }

    categoryById = async (req, res, next) => {
        try {
            const { id } = req.params

            const category = await Category.findById(id)

            if (category) {
                res.send(category)
            } else {
                notFoundError(next, 'Category')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    byCategoryId = async (req, res, next) => {
        try {
            const { id } = req.params

            const articles = await Article.find({ status: true, categoryId: id })

            res.send(articles)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    comment = async (req, res, next) => {
        try {
            const { id } = req.params

            const { name, email, comment } = req.body

            await Comment.create({ name, email, comment, articleId: id })

            res.status(201).send({
                message: 'Comment added.',
            })
        } catch (error) {
            errorMsg(next, error)
        }
    }

    byArticleId = async (req, res, next) => {
        try {
            const { id } = req.params

            const comments = await Comment.find({ articleId: id })

            res.send(comments)
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new FrontCtrl