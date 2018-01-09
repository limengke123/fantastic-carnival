/**
 * Created by li on 2018/1/8 17:32.
 */

const utils = require('../util/index')

const {
    __before,
    __after,
    main,
    BaseAop
} = require('../util/aop.js')
const joi = require('joi')
const {
    articles: ROUTER_NAME
} = require('../config').routerName

module.exports.init = async router => {
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
}

class ActionList extends BaseAop {
    /*static schema = joi.object().keys({
        tag: joi.string().optional()
    })

    async [__before](ctx, next) {
        const query = ctx.query
        const {error} = joi.validate({
            tag: query.tag
        }, this.constructor.schema)
        if (error) {
            return ctx.throw(400, 'wrong list')
        }
        return next()
    }*/
    static a = "das"

    async [main](ctx, next) {
        console.log('main')
        const tag = ctx.query.tag
        ctx.body = 'hello'
        return next()
    }
}
console.log(ActionList.a)
