/**
 * Created by li on 2018/1/19 9:59.
 */
const logger = require('../util').logger

const User = require('../model/user')

class UserService {
    async create (option){
        const user = new User(option)
        let result = null
        try{
            result = await user.save()
        }catch (e){
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async findOne (username = null){
        let searchParam = {}
        if(username){
            searchParam.username = username
        }
        let result = null
        try {
            result = await User.findOne(searchParam)
                .exec()
        } catch (e){
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
    async update(id, modifyParam ){
        let result = null
        try{
            result = await User.findOneAndUpdate(id,{
                "$set":modifyParam
            },{
                new :true
            })
                .exec()
        } catch (e){
            logger.error(e)
            throw e
        }
        return result && result.toObject()
    }
}

module.exports = new UserService()