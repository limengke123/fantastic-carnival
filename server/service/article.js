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

    async findOne(id,sort=null,limit=null,skip=null){
        let searchParam = {
            _id:id
        }
        let result = null
        try{
            result = await Article.findOne(searchParam)
                .populate('tags')
                .select('title visits tags createTime lastEditTime excerpt')
                .sort({
                    createTime:-1,
                    ...sort
                })
                .limit(limit)
                .skip(skip)
                .exec()
        } catch(e){
            logger.error(e)
            throw e
        }
        return result
    }

    async update (id,modifyParam){
        let result = null
        try{
            result = await Article.findOneAndUpdate(id,{
                $set:modifyParam
            },{
                new :true
            }).exec()
        }catch (e){
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }

    async findPrev(id){
        let result = null
        try{
            result = Article.findOne({
                _id:{
                    $lt:id
                }
            },"title _id")
                .sort({
                    _id:1
                })
                .exec()
        } catch (e){
            logger.error(e)
            throw e
        }
        //return result && result.toObject()
        return result
    }

    async findNext (id){
        let result = null
        try{
            result = Article.findOne({
                _id:{
                    $gt:id
                }
            },"title _id")
                .exec()
        } catch (e){
            logger.error(e)
            throw e
        }
        return result
        // return result && result.toObject()
    }

    async deleteTag (tagId){
        try {
            await Article.update({},{
                $pull:{
                    tags:tagId
                }
            })
                .exec()
        }catch (e){
            logger.error(e)
        }
    }

    async incVisits(article){
        if(article){
            try{
                await article.update({
                    $inc:{
                        visits:1
                    }
                }).exec()
                console.log("after",article)
            } catch (e){
                console.log(e)
                logger.error(e)
                throw e
            }
        }
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