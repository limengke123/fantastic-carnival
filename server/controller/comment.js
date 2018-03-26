
const joi = require('joi')
const chalk = require('chalk')

const utils = require('../util/index')

const {
    BaseAop,
    __before,
    main
} = require('../util/aop')

const errorList = require('../error')

const {
    comments: ROUTER_NAME
} = require('../config').routerName

const CommentService = require('../service/comment')

/*module.exports.init = router => {
    router.post(`/${ROUTER_NAME}`, new ActionCreate().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
    console.log(chalk.blue(`router of ${ROUTER_NAME} has been injected` ))
}*/

class ActionCreate extends BaseAop{
    static schema = joi.object().keys({
        article: joi.objectId().required(),
        message: joi.string().required(),
        respondTo: joi.string().required(),
        author:joi.string().required(),
        authorAvatar:joi.string().optional()
    })

    async [__before](ctx, next){
        const body = ctx.request.body
        const {error} = joi.validate(body, this.constructor.schema,{allowUnknown:true})
        if(error){
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name,{
                message: errorList.validationError.message,
                'parameter-name':error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }

    async [main](ctx, next){
        const {
            article,
            message,
            createTime=new Date(),
            respondTo,
            author,
            authorAvatar = "",
            likes = 0
        } = ctx.request.body

        let result = null

        try{
            result = await CommentService.create({
                article,
                message,
                createTime,
                respondTo,
                author,
                authorAvatar,
                likes,
            })
        } catch (e){
            ctx.throw(500, errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success:true,
            data:result
        }
    }
}

class ActionList extends BaseAop{
    static schema = joi.object().keys({
        article:joi.objectId().required(),
        limit:joi.number().optional(),
        page:joi.number().optional()
    })

    async[__before](ctx, next){
        const query = ctx.query

        const {error} = joi.validate({
            article: query.article,
            limit: ~~query.limit,
            page: ~~query.page
        })

        if(error){
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name,{
                message:errorList.validationError.message,
                'parameter-name':error.details.map(detail => detail.path).join(','),
                reason
            })
        }

        return next()
    }

    async [main](ctx, next){
        const article = ctx.query.article

        const limit = ~~ctx.query.limit || 10
        const page = ~~ctx.query.page
        let skip
        if(page === 0){
            skip = 0
        } else {
            skip = limit * (page -1)
        }

        try{
            const [articleArr, totalNumber] = await Promise.all([
                CommentService.find(article, limit, skip),
                CommentService.count()
            ])

            ctx.status = 200

            ctx.body = {
                success: true,
                data:{
                    articles: articleArr,
                    total:totalNumber
                }
            }
        } catch (e){
            utils.print(e)
            ctx.throw(500, errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }

        return next()

    }
}