/**
 * Created by li on 2018/1/9 17:00.
 */
const {
    __before,
    __after,
    main,
    BaseAop
} = require('../util/aop')
const path = require('path')
const fs = require('fs')
const htmlPath = path.resolve(__dirname,"../index.html")
module.exports.init = router => {
   // router.get('/',a)
     router.get('/',new HomePage().getAOPMiddleWare())
}
const a = async ctx => {
    ctx.body = 'hhhh'
}
class HomePage extends BaseAop{
    async [main](ctx,next){
        const rs = fs.createReadStream(htmlPath)
        //console.log(__dirname)
        ctx.type = 'text/html'
        ctx.body = rs
    }
}