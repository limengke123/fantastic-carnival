/**
 * Created by li on 2018/1/19 16:55.
 */
const jwt = require('jsonwebtoken')

const configs = require('../config/index')
const {logger, print} = require('../util/index')

const mw = require('../middleware/index')
const md5 = require('md5')

const cert = configs.jwt.cert
const UserService = require('../service/user')

const {
    BaseAop,
    __before,
    main
} = require('../util/aop')

const errorList = require('../error')

const joi = require('joi')

const {
    tokens: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    await seed()
    router.post(`./${ROUTER_NAME}`,new ActionCreate().getAOPMiddleWare())
    router.get(`./${ROUTER_NAME}/check`,mw.verifyToken,check)
}
async function seed() {
    let user = null
    try {
        user = await UserService.findOne()
        if (user === null) {
            await UserService.create({
                name: 'admin',
                username: 'admin',
                password: md5('password').toUpperCase(),
                avatar: '',
                createTime: new Date()
            })
        }
    } catch (e) {
        logger.error('error happens when creating initialization')
        print(errorList.seedingError.message)
        let error = new Error(errorList.seedingError.message)
        error.name = errorList.seedingError.name
        throw e
    }
}
class ActionCreate extends BaseAop{
    static schema = joi.object().keys({
        username:joi.string().min(1).required(),
        password:joi.string().min(1).required()
    })
    async [__before](ctx,next){
        const {username , password} = ctx.request.body
        const {error} = joi.validate({
            username,
            password
        },this.constructor.schema)
        if(error){
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400,errorList.validationError.name,{
                message:errorList.validationError.message,
                'parameter-name':error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }
    async [main](ctx,next){
        const {username, password} = ctx.request.body
        print(username,password)
        let user = null
        try{
            user = await UserService.findOne(username)
        } catch (e){
            ctx.throw(500,errorList.storageError.name,{
                message:errorList.storageError.message,
            })
        }
        if(user !== null){
            if(user.password === password){
                const token = jwt.sign({
                    uid:user._id,
                    name:user.name,
                    exp:Math.floor(Date.now() / 1000) + 24 * 60 * 60
                },cert)
                print(token)
                ctx.status = 200
                ctx.body = {
                    success:true,
                    data:{
                        uid:user._id,
                        name:user.name,
                        token
                    }
                }
            } else {
                ctx.throw(401,errorList.passwordError.name,{
                    message:errorList.passwordError.message
                })
            }
        } else {
            ctx.throw(401,errorList.usernameError.name,{
                message:errorList.usernameError.message
            })
        }
        return next()
    }
}
async function check (ctx,next){
    ctx.status = 200
    ctx.body = {
        success:true,
        message:'验证通过'
    }
}




























