/**
 * Created by li on 2018/1/8 17:23.
 */
const article = require('./article.js')
const home = require('./home')
module.exports.init = async router => {
    article.init(router)
    home.init(router)
}