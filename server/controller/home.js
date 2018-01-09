/**
 * Created by li on 2018/1/9 17:00.
 */
const {
    __before,
    __after,
    main,
    BaseAop
} = require('../util/aop')

module.exports.init = router => {
    router.get('/',a)
    // router.get('/',new HomePage().getAOPMiddleWare())
}
const a = async ctx => {
    ctx.body = 'hhhh'
}
class HomePage extends BaseAop{
    async [main](ctx,next){
        ctx.body = 'hello homepage !'
    }
}