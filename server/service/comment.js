const logger = require('../util').logger

const Comment = require('../model/comment')

class CommentService{
    static async create (option){
        const comment = new Comment(option)
        let result = null
        try{
            result = await comment.save()
        } catch (e){
            logger.error(e)
            throw e
        }

        return result
    }

    static async find(articleId, limit = null, skip = null){
        let result = null
        try{
            result = await Comment.find({
                article: articleId
            })
                .populate('respondTo')
                .select('message respndTo createTime author authorAvater likes')
                .sort({
                    createTime:1
                })
                .limit(limit)
                .skip(skip)
                .exec()
        } catch (e){
            logger.error(e)
            throw e
        }
        return result && result.map(item => item.toObject())
    }

    static async findOne(id){
        let result = null
        try{
            result = await Comment.findOne({
                _id:id
            })
        } catch (e){
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }

    static async count(){
        let result = null
        try{
            result = await Comment.count().exec()
        } catch (e){
            logger.error(e)
            throw e
        }
        return result
    }
}

module.exports = CommentService