const {logger} = require('../util/index')

const Article = require('../model/article')

class ArticleService {
    async create (option){
        const article = new Article(option)
        let result = null
        try {
            result = await article.save()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
    async find(sort = null, limit = null, skip = null) {
        let result
        try {
            result = await Article.find()
                .populate('tags')
                .select('title visits tags createTime lastEditTime excerpt')
                .sort(sort)
                .limit(limit)
                .skip(skip)
                .exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result && result.map(item => item.toObject())
    }
    async count (){
        let result
        try {
            result = await Article.count().exec()
        } catch (e) {
            logger.error(e)
            throw e
        }
        return result
    }
}

module.exports = new ArticleService()