/**
 * Created by li on 2018/1/9 9:54.
 */
module.exports = {
    env:'development',
    debug:true,
    mongoConfig:{
        url:'mongodb://127.0.0.1:27017/testdb1',
        opts:{
        }
    },
    jwt:{
        cert:'kov-blog-dev'
    }
}