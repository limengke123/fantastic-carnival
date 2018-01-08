/**
 * Created by li on 2018/1/8 17:08.
 */
const path = require('path')
const fs = require('fs')
const base = require('./base')
const dev = require('./dev')
const _ = require('lodash')

let config = base

if (process.env.NODE_ENV === 'development') {
    config = _.merge(base, dev)
}

if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(path.join(__dirname, 'private.js'))) {
        config = _.merge(config, require('./private.js'))
    }
}

module.exports = config