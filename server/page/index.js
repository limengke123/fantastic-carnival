const fs = require('fs')
const path = require('path')
const adminPath = path.resolve(__dirname,'../static/adminDist/index.html')

module.exports.init = router => {
    router.get(`/admin`,function(ctx,next){
        //ctx.body = 1
        ctx.type = 'text/html'
        ctx.body = fs.createReadStream(adminPath)
        return next()
    })
}