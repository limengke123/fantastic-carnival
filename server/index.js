const path = require('path')
const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const config = require('./config/index')
const apiRouter = require('koa-router')({
    prefix: config.app.apiPath
})
const pageRouter = require('koa-router')()
const onerror = require('koa-onerror')
const mongoose = require('mongoose')
const controllers = require('./controller/index.js')
const pageController = require('./page/index')
const utils = require('./util')

const staticPath = './static'

mongoose.Promise = global.Promise

;(async () => {
    //连接数据库
    mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)

    //没卵用的config注入context
    app.context.config = config

    onerror(app, {
        json(err){
            Object.keys(err).reduce((body, key) => {
                body[key] = err[key]
                return body
            }, this.body = {})
            this.body.error = err.name
        }
    })

    //错误
    app.on('error', (err, ctx) => {
        if ((ctx.status === 404 && err.status === void 0) || err.status === 500) {
            utils.logger.error('server error')
            utils.logger.error(err)
            utils.logger.error(ctx,'error happens with ctx')
        }
        utils.print(err)
    })

    //bodyParser 中间件
    app.use(bodyParser())

    //页面路由控制
    pageController.init(pageRouter)
    app.use(pageRouter.routes())
    app.use(pageRouter.allowedMethods())

    //api路由控制
    await controllers.init(apiRouter)
    app.use(apiRouter.routes())
    app.use(apiRouter.allowedMethods())

    //注入静态资源中间件
    app.use(koaStatic(path.join(__dirname,staticPath)))


    app.listen(config.app.port, () => {
        utils.print('app is listening on port' + config.app.port
            + ";" + "mongo url is " + config.mongoConfig.url
        )
    })
})().catch(err => {
    utils.print(err.stack)
})