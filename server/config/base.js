/**
 * Created by li on 2018/1/8 17:09.
 */
const path = require('path')

module.exports = {
    app : {
        name:'blog',
        port :3333,
        apiPath: '/api'
    },
    mongoConfig : {
        url:'mongodb://127.0.0.1:27017/testdb1',
        opts: {
            user:'',
            pass:''
        }
    },
    jwt :{
        'cert' : 'li_blog'
    },
    dir:{
        root : path.resolve(__dirname,'..','..'),
        log:path.resolve(__dirname,'..','log'),
        server:path.resolve(__dirname),
        upload:path.resolve(path.dirname(__dirname),'runtime')
    },
    routerName:{
        articles:'articles',
        drafts:'drafts',
        tags:'tags',
        publications:'publications',
        tokens:'tokens',
        comments:'comments',
        me:'me'
    },
    cache:{
        size:5,
        maxAge:20 * 60 * 1000
    }
}