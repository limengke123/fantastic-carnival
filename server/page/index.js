const fs = require('fs')
const path = require('path')
const adminPath = path.resolve(__dirname,'../static/adminDist/index.html')
const clientPath = path.resolve(__dirname,'../static/clientDist/index.jsx.html')
module.exports.init = router => {
    router.get(`/admin`,function(ctx,next){
        ctx.type = 'text/html'
        ctx.body = fs.createReadStream(adminPath)
        return next()
    })
    router.get(`/client`,function(ctx,next){
        ctx.type = 'text/html'
        ctx.body = fs.createReadStream(clientPath)
        return next()
    })
}