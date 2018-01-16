'use strict'
const utils = require('../util/index')

const TagService = require('../service/tag.js')
const ArticleService = require('../service/article')

const {
    __before,
    main,
    BaseAop
} = require('../util/aop.js')

const errorList = require('../error')
const joi = require('joi')

const {
    tags: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`, new ActionCreate().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}`,new ActionList().getAOPMiddleWare())
}
class ActionList extends BaseAop{
    static schema = joi.object().keys({
        startWidth:joi.string().optional()
    })
    async [__before](ctx,next){
        const queryStartWith = ctx.query['start-with']

        const {error} = joi.validate({
            startWith:queryStartWith
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
        const queryStartWith = ctx.query['start-with']
        let tagList = null
        try{
            tagList = await TagService.find(queryStartWith)
        } catch (e){
            ctx.throw(500,errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }
        ctx.status = 200
        ctx.body = {
            success:true,
            data:tagList
        }
        return next()
    }
}
class ActionCreate extends BaseAop {
    static schema = joi.object().keys({
        name: joi.string().min(1).required()
    })

    async[__before](ctx, next) {
        const name = ctx.request.body.name
        const {error} = joi.validate({
            name
        }, this.constructor.schema)
        if (error) {
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }

    async [main](ctx, next) {
        const tagName = ctx.request.body.name
        let tag = null
        try {
            tag = await TagService.findOne(null, tagName)
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        if (tag !== null) {
            ctx.status = 200
            //排除重复创建
            ctx.body = {
                success: false,
                data: {
                    id: tag.id
                }
            }
            return next()
        }
        try {
            tag = await TagService.create({
                name: tagName
            })
            console.log("creating")
        } catch (e) {
            console.log("create wrong in e")
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        ctx.status = 200
        ctx.body = {
            success: true,
            data: {
                id: tag.id
            }
        }
        return next()
    }
}


