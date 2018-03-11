/**
 * Created by li on 2018/1/19 10:24.
 */
const logger = require('../util').logger

const Draft = require('../model/draft')

class DraftService {
    async create (option){
        const draft = new Draft(option)
        let result = null
        try{
            result = await draft.save()
        }catch (e){
            logger.error(e)
            throw e
        }
        return result
    }
    async find (tag){
        let draftArr = null
        try{
            let searchParam = {}
            if(tag){
                searchParam = {
                    '$all':[tag]
                }
            }
            draftArr = await Draft.find(searchParam)
                .populate('tags')
                .select('title tags createTime lastEditTime excerpt article draftPublished')
                .sort({
                    lastEditTime:-1
                })
                .exec()
            const resultArr = []
            if(draftArr.length){
                draftArr.forEach((draft,index,arr) => {
                    draft = draft.toObject()
                    resultArr.push(draft)
                })
            }
        } catch (e){
            logger.error(e)
            throw e
        }
        return draftArr && draftArr.map(item => item.toObject())
    }
    async findOne(id ,sort = null, limit = null, skip = null){
        let result = null
        try{
            result = await Draft.findOne({
                _id:id
            })
                .populate('tags')
                .select('title tags creteTime lastEditTime excerpt article draftPublished content')
                .sort(sort)
                .limit(limit)
                .skip(skip)
                .exec()
        }catch (e){
            logger.error(e)
            throw e
        }
        console.log('--result',result)
        console.log('--result.toobject',result.toObject())
        return result && result.toObject()
    }
    async update(id,modifyParam ){
        let result = null
        try{
            result = await Draft.findByIdAndUpdate(id,{
                $set:modifyParam
            },{
                new :true
            })
                .populate('tags')
                .exec()
        }catch (e){
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async delete(id){
        let result = null
        try{
            result = await Draft.remove({
                _id:id
            }).exec()
        } catch (e){
            logger.error(e)
        }
        return result
    }
    async deleteTag (tagId){
        try{
            await Draft.update({},{
                $pull:{
                    tags:tagId
                }
            })
                .exec()
        } catch (e){
            logger.error(e)
            throw e
        }
    }
}

module.exports = new DraftService()