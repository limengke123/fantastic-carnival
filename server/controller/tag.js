'use strict'
const utils = require('../util/index')

const TagService = require('../service/tag.js')
const ArticleService = require('../service/article')

const {
    BaseAOP,
    __before,
    main
} = require('../util/aop')

const errorList = require('../error')
const joi = require('joi')

const {
    tag:ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    router.post(`/${ROUTER_NAME}`,new ActionCreate().getAOPMiddleWare())
}

class ActionCreate extends BaseAOP{
    static schema = joi.object().keys({
        name:joi.string().min(1).required()
    })
    async[__before](ctx,next){
        const name = ctx.request.body.name
        const {error} = joi.validate({
            name
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
        const tagName = ctx.request.body.name
        let tag = null
        try {
            tag = await TagService.findOne(null, tagName)
        } catch (e) {
            ctx.throw(500,errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }

    }

}

