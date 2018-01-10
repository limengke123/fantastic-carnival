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

const errorList = require('../error')
const {
    articles: ROUTER_NAME
} = require('../config').routerName
const ArticleService = require('../service/article')
module.exports.init = async router => {
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
}

class ActionList extends BaseAop {
    static schema = joi.object().keys({
        tag: joi.string().optional(),
        limit: joi.number().optional(),
        page: joi.number().optional()
    }).without('tag', 'page')

    async [__before](ctx, next) {
        const query = ctx.query
        const {error} = joi.validate({
            tag: query.tag,
            //少见的去小数的方法
            limit:~~query.limit,
            page:query.page
        }, this.constructor.schema)
        if (error) {
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name,{
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }

    async [main](ctx, next) {
        const tag = ctx.query.tag
        if(tag === void 0){

        } else {
            const limit = ~~ctx.query.limit || 10
            const page = ~~ctx.query.page
            let skip
            skip = page === 0 ? 0 : limit * (page - 1)
            try{
                const [articleArr, totalNumber] = await Promise.all([
                    ArticleService.find({},limit,skip),
                    ArticleService.count()
                ])
                ctx.status = 200
                ctx.body = {
                    success:true,
                    data:{
                        articles:articleArr,
                        total:totalNumber
                    }
                }
            } catch (e){
                utils.print(e)
                ctx.throw(500,
                    errorList.storageError.name,
                    {message:errorList.storageError.message})
            }
        }
        return next()
    }
}
