/**
 * Created by li on 2018/1/8 17:32.
 */

const utils = require('../util/index')
const mw = require('../middleware/index')
const chalk = require('chalk')
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
const DraftService = require('../service/draft')

module.exports.init = async router => {
    router.get(`/${ROUTER_NAME}`, new ActionList().getAOPMiddleWare())
    router.get(`/${ROUTER_NAME}/:id`, new ActionDetail().getAOPMiddleWare())
    router.post(`/${ROUTER_NAME}`, mw.verifyToken,new ActionCreate().getAOPMiddleWare())
    router.patch(`/${ROUTER_NAME}/:id`, new ActionModify().getAOPMiddleWare())
    router.delete(`/${ROUTER_NAME}/:id`, new ActionDelete().getAOPMiddleWare())
    console.log(chalk.blue(`router of ${ROUTER_NAME} has been injected` ))
}

class ActionCreate extends BaseAop {
    static schema = joi.object().keys({
        title: joi.string().required(),
        tags: joi.array().items(joi.number()).unique().allow(null),
        excerpt: joi.string().required(),
        content: joi.string().required()
    })

    async [__before](ctx, next) {
        const body = ctx.request.body
        const {error} = joi.validate(body, this.constructor.schema, {
            allowUnknown: true
        })
        if (error) {
            const reason = error.details.map(val => val.message).join(',')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }

    async [main](ctx, next) {
        const {
            title,
            visits = 0,
            createTime = new Date(),
            lastEditTime = new Date(),
            excerpt,
            content,
            comments = []
        } = ctx.request.body
        let result = null
        console.log('-----')
        try {
            result = await ArticleService.create({
                title,
                visits,
                createTime,
                lastEditTime,
                excerpt,
                content,
                comments
            })
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        ctx.status = 200
        ctx.body = {
            success: true,
            data: {
                id: result._id
            }
        }
        return next()
    }
}

class ActionList extends BaseAop {
    static schema = joi.object().keys({
        tag: joi.string().optional(),
        limit: joi.number().optional(),
        sort: joi.number().optional(),
        page: joi.number().optional()
    }).without('tag', 'page')

    async [__before](ctx, next) {
        const query = ctx.query
        const {error} = joi.validate({
            tag: query.tag || " ",
            //少见的去小数的方法
            limit: ~~query.limit,
            page: query.page,
            sort: query.sort
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
        const tag = ctx.query.tag || " "
        if (tag !== void 0 && tag !== " ") {
            try {
                let articleArr = await ArticleService.findWithTag(tag)
                utils.print(articleArr)
                ctx.body = {
                    success: true,
                    data: articleArr
                }
            } catch (e) {
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        } else {
            const limit = ~~ctx.query.limit || 10
            const page = ~~ctx.query.page
            const sort = ctx.query.sort || -1
            let skip
            skip = page === 0 ? 0 : limit * (page - 1)
            try {
                const [articleArr, totalNumber] = await Promise.all([
                    ArticleService.find(sort, limit, skip),
                    ArticleService.count()
                ])
                ctx.status = 200
                ctx.body = {
                    success: true,
                    data: {
                        articles: articleArr,
                        total: totalNumber
                    }
                }
            } catch (e) {
                utils.print(e)
                ctx.throw(500,
                    errorList.storageError.name,
                    {message: errorList.storageError.message})
            }
        }
        return next()
    }
}

class ActionDetail extends BaseAop {
    static schema = joi.object().keys({
        id: joi.objectId().required()
    })

    async [__before](ctx, next) {
        const id = ctx.params.id
        const {error} = joi.validate({
            id
        }, this.constructor.schema)


        if (error) {
            const reason = error.detals.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }

    async [main](ctx, next) {
        const id = ctx.params.id
        let article = null
        try {
            article = await ArticleService.findOne(id)
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        ctx.status = 200
        ctx.state.article = article
        article = article.toObject()
        if (article) {
            try {
                [article.nextArticle, article.prevArticle] = await Promise.all([
                    ArticleService.findNext(id),
                    ArticleService.findPrev(id)
                ])
            } catch (e) {
                ctx.throw(500, errorList.storageError.name, {
                    message: errorList.storageError.message
                })
            }
        }

        ctx.body = {
            success: true,
            data: article
        }

        return next()
    }

    async [__after](ctx, next) {
        const article = ctx.state.article
        try {
            await ArticleService.incVisits(article)
        } catch (e) {
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        return next()
    }
}

class ActionModify extends BaseAop {
    static schema = joi.object().keys({
        id: joi.objectId(),
        body: joi.object()
    })

    async [__before](ctx, next) {
        const id = ctx.params.id
        const body = ctx.request.body

        const {error} = joi.validate({
            id,
            body
        }, this.constructor.schema)
        if (error) {
            const reason = errorList.validationError.map(val => val.message).join(';')
            return ctx.throw(400, errorList.validationError.name, {
                message: errorList.validationError.message,
                'parameter-name': error.details.map(detail => detail.path).join(','),
                reason
            })
        }
        return next()
    }

    async [main](ctx, next) {
        const id = ctx.params.id
        const body = ctx.request.body

        let article = null
        try {
            article = await ArticleService.update(id, body)
        } catch (e) {
            if (e.name === 'CastError') {
                ctx.throw(400, errorList.idNotExistError.name, {
                    message: errorList.idNotExistError.message
                })
            }
            ctx.throw(500, errorList.storageError.name, {
                message: errorList.storageError.message
            })
        }
        ctx.status = 200
        utils.print(article)
        ctx.body = {
            success: true,
            data: article
        }
    }
}

class ActionDelete extends BaseAop {
    static schema = joi.object().keys({
        id:joi.objectId()
    })

    async [__before](ctx, next){
        const id = ctx.params.id

        const {error} = joi.validate({
            id
        }, this.constructor.schema)

        if(error){
            const reason = error.details.map(val => val.message.join(';'))
            return ctx.throw(400, errorList.validationError.name,{
                message:errorList.validationError.message,
                'parameter-name':errorList.validationError.message,
                reason
            })
        }
        return next()
    }

    async [main](ctx, next){
        const id = ctx.params.id
        let article = null
        try{
            article = await ArticleService.findOne(id)
        } catch (e){
            ctx.throw(500,errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }

        if(article === null){
            ctx.throw(400, errorList.idNotExistError.name,{
                message: errorList.idNotExistError.message
            })
        }

        const draftId = article.draft

        if(!draftId){
            ctx.throw(400, errorList.idNotExistError.name,{
                message:errorList.idNotExistError.message
            })
        }

        let draft = null

        try{
            draft = await DraftService.findOne(draftId)
        } catch (e){
            ctx.throw(500, errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }

        if(draft === null){
            ctx.throw(400, errorList.idNotExistError.name, {
                message: errorList.idNotExistError.message
            })
        }

        try{
            await Promise.all([ArticleService.delete(id),DraftService.delete(draftId)])
        } catch (e){
            ctx.throw(500,errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }

        ctx.status = 200
        ctx.body = {
            success:true
        }
        return next()
    }
}

