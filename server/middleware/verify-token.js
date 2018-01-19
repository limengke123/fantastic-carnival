/**
 * Created by li on 2018/1/19 14:07.
 */
const utils = require('../util')
const config = require('../config/index')
const util = require('util')
const jwt = require('jsonwebtoken')
const verify = util.promisify(jwt.verify)
const {
    BaseAop,
    __before,
    __after,
    main
} = require('../util/aop')

const errorList = require('../error')

const timeRecorder = new WeakMap()

class VerifyToken extends BaseAop {
    async [__before](ctx, next) {
        timeRecorder.set(ctx, Date.now())
        return next()
    }

    async [main](ctx, next) {
        const authorization = ctx.get('Authorization')
        if(authorization === "") {
            ctx.throw(401, errorList.noneTokenError.name, {
                message: errorList.noneTokenError.message
            })
        }
        const token = authorization.split(' ')[1]
        let tokenContent = null
        try{
            tokenContent = await verify(token,config.jwt.cert)
        } catch (e){
            if(e.name === "TokenExpiredError"){
                ctx.throw(401,errorList.tokenExpiredError.name,{
                    message:errorList.tokenExpiredError.message
                })
            }
            ctx.throw(401,errorList.invalidTokenError.name,{
                message:errorList.invalidTokenError.message
            })
        }
        utils.print('鉴权通过')
        ctx.token = tokenContent
        return next()
    }
    async [__after](ctx,next){
        const start = timeRecorder.get(ctx)
        const end = Date.now()
        utils.print(end - start)
        return next()
    }
}

module.exports = new VerifyToken().getAOPMiddleWare()