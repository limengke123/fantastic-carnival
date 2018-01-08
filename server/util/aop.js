/**
 * Created by li on 2018/1/8 17:32.
 */
const __before = Symbol('__before')
const __after = Symbol('__after')
const main = Symbol('main')

class BaseAop {
    getAOPMiddleWare (){
        const before = this[__before]
        const mainFun = this[main]
        const after = this[__after]
        const that = this

        if(before || after){
            return async function(ctx, next) {
                const boundAfter = after ?
                    after.bind(that,ctx,next):
                    next
                if(before) {
                    const boundMain = mainFun.bind(that,ctx,boundAfter)
                    return before.call(that,ctx,boundMain)
                } else {
                    return mainFun.call(that,ctx,boundAfter)
                }
            }
        } else {
            return mainFun
        }
    }
}

module.exports = {
    __before,
    __after,
    main,
    BaseAop
}