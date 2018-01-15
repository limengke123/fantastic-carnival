const {logger} = require('../util/index')

const Article = require('../model/article')

class ArticleService {
    async create (option){
        const article = new Article(option)
        let result = null
        console.log('保存前')
        try {
            console.log("准备保存",article)
            result = await article.save()
        } catch (e) {
            console.log(e)
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