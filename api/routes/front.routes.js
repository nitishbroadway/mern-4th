const { Router } = require('express')
const { Front } = require('../controllers')

const router = Router()

router.route('/articles/:id/comments')
    .get(Front.FrontCtrl.byArticleId)
    .post(Front.FrontCtrl.comment)

router.get('/articles/:id', Front.FrontCtrl.articleById)

router.get('/articles', Front.FrontCtrl.articles)

router.get('/categories/:id/articles', Front.FrontCtrl.byCategoryId)

router.get('/categories/:id', Front.FrontCtrl.categoryById)

router.get('/categories', Front.FrontCtrl.categories)

module.exports = router