/**
 * Created by li on 2018/1/8 17:23.
 */
const article = require('./article.js')
const tag = require('./tag')
const home = require('./home')
const token = require('./token')
module.exports.init = async router => {
    tag.init(router)
    article.init(router)
    home.init(router)
    token.init(router)
}