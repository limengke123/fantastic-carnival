/**
 * Created by li on 2018/1/8 17:06.
 */
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const config = require('./config/index')
const router = require('koa-router')({
    prefix: config.app.apiPath
})
const onerror = require('koa-onerror')
const mongoose = require('mongoose')
const controllers = require('./controller/index.js')
const utils = require('./util')

mongoose.Promise = global.Promise
;(async () => {
    mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)
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
    app.on('error', (err, ctx) => {
        if ((ctx.status === 404 && err.status === void 0) || err.status === 500) {
            //utils.logger.error('server error')
            //utils.logger.error(err)
            //utils.logger.error(ctx,'error happens with ctx')
        }
        //utils.print(err)
    })

    app.use(bodyParser())
    controllers.init(router)
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(config.app.port, () => {
        utils.print('app is listening on port' + config.app.port)
    })
})().catch(err => {
    utils.print(err.stack)
})