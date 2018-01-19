/**
 * Created by li on 2018/1/19 9:54.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    username:String,
    password:String,
    avatar:String,
    createTime:String
})

module.exports = mongoose.model('user',userSchema)