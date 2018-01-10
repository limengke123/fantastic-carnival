const {logger} = require('../util')

const Article = require('../model/article')

class ArticleService {
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
            logger(e)
            throw e
        }
        return result && result.map(item => item.toObject())
    }
    async count (){
        let result
        try {
            result = await Article.count().exec()
        } catch (e) {
            logger(e)
            throw e
        }
        return result
    }
}

module.exports = new ArticleService()