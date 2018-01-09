/**
 * Created by li on 2018/1/9 10:12.
 */
'use strict'
const config = require('../config/index.js')
const debug = require('debug')

const utils = {}

utils.print = debug('li-blog')

const bunyan = require('bunyan')
let log = bunyan.createLogger({
    name: 'app',
    serializers: {
        router (router) {
            return null
        },
        req (req) {
            const logKeys = ['method', 'url', 'header']
            return logKeys.reduce(function (acc, key) {
                acc[key] = req[key]
                return acc
            }, {})
        },
        matched () {
            return null
        },
        res (res) {
            const logKeys = ['status', 'message', 'header']
            return logKeys.reduce(function (acc, key) {
                acc[key] = res[key]
                return acc
            }, {})
        },
        cookies () {
            return null
        },
        accept () {
            return null
        }
    },
    streams: [{
        type: 'rotating-file',
        path: config.dir.log + '/error.log',
        period: '1d',   // daily rotation
        count: 30        // keep 3 back copies
    }]
})
utils.logger = log
utils.formatDate = (date, fmt) => {
    let o = {
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds(),
        'q+':Math.floor((date.getMonth() + 3) / 3),
        'S':date.getMilliseconds()
    }
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').subStr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if(new RegExp(`(${k})`).test(fmt)){
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)
                ? (o[k])
                :(('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
}
module.exports = utils