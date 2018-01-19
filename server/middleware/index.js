/**
 * Created by li on 2018/1/19 13:14.
 */
const fs = require('fs')
const middlewares = {}
const files = fs.readdirSync(__dirname)

const camelRe = /-(\w)/g
const camelize = str => str.replace(camelRe,(_,c) => c.toUpperCase())

for (let file of files) {
    if(file !== 'index.js'){
        const fileName = file.split('.')[0]
        middlewares[camelize(fileName)] = require('./' + file)
    }
}

module.exports = middlewares