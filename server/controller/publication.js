/**
 * Created by li on 2018/3/8 16:35.
 */
const joi = require('joi')
const chalk = require('chalk')

const DraftService = require('../service/draft')
const ArticleService = require('../service/article')

const mw = require('../middleware/index')
const errorList = require('../error')
const {
    BaseAop,
    __before,
    main
} = require('../util/aop')
const {
    publications: ROUTER_NAME
} = require('../config').routerName

module.exports.init = (router) => {
    router.post(`/${ROUTER_NAME}`,mw.verifyToken,new ActionCreate().getAOPMiddleWare())
    console.log(chalk.blue(`router of ${ROUTER_NAME} has been injected\n`))
}

class ActionCreate extends BaseAop{
    static schema = joi.object().keys({
        draftId:joi.objectId().required()
    })

    async [__before](ctx,next){
        const draftId = ctx.request.body.draftId

        const {error} = joi.validate({
            draftId
        },this.constructor.schema)

        if(error){
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400,errorList.validationError.name,{
                message:errorList.validationError.message,
                'parameter-name':error.details.map(val => val.path).join(';'),
                reason
            })
        }
        return next()
    }

    async [main](ctx,next){
        const draftId = ctx.request.body.draftId

        let draft = null

        try{
            draft = await DraftService.findOne(draftId)
        } catch (e){
            ctx.throw(500,errorList.storageError.name,{
                message:errorList.storageError.message
            })
        }
        if(draft === null){
            ctx.throw(400,errorList.idNotExistError.name,{
                message:errorList.idNotExistError.message
            })
        }
        const schema = joi.object().keys({
            title:joi.string().min(1).required(),
            excerpt:joi.string().min(1).required(),
            content:joi.string().min(1).required(),
        })
        const {error} = joi.validate(draft,schema,{
            allowUnknown:true
        })

        if(error){
            const reason = error.details.map(val => val.message).join(';')
            return ctx.throw(400,errorList.validationError.name,{
                message:errorList.validationError.message,
                'parameter-name':error.details.map(val => val.path).join(';'),
                reason
            })
        }

        draft.draftPublished =true
        draft.lastEditTime = new Date()

        const articleOption = {
            ...draft
        }
        delete articleOption._id
        delete articleOption.id
        delete articleOption.draftPublished
        delete articleOption.article
        delete articleOption.createTime

        const id = draft.id
        delete draft._id
        delete draft.id

        let article = null
        if(draft.article !== null){
            try{
                [,article] =await Promise.all([
                    DraftService.update(id,draft),
                    ArticleService.update(draft.article,articleOption)
                ])
            } catch (e){
                ctx.throw(500,errorList.storageError.name,{
                    message:errorList.storageError.message
                })
            }
        } else {
            articleOption.createTime = new Date()
            delete articleOption.lastEditTime
            articleOption.visits = 0
            articleOption.comments = []

            try{
                article = await ArticleService.create(articleOption)
            } catch (e){
                ctx.throw(500,errorList.storageError.name,{
                    message:errorList.storageError.message
                })
            }

            draft.article = article._id

            try{
                draft = await DraftService.update(id,draft)
            } catch (e){
                ctx.throw(500,errorList.storageError.name,{
                    message:errorList.storageError.message
                })
            }
        }

        ctx.status = 200
        ctx.body = {
            success:true,
            data:{
                article
            }
        }
        return next()
    }
}













