/**
 * Created by li on 2018/1/8 17:23.
 */
const article = require('./article.js')
module.exports.init = async router => {
    article.init(router)
}