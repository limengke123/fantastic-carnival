/**
 * Created by li on 2018/1/19 10:49.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const utils = require('../util')

const commentSchema = new Schema({
    article: {
        id: Schema.Types.ObjectId,
        ref: 'article'
    },
    message: String,
    respondTo: {
        id: Schema.Types.ObjectId,
        ref: 'comment'
    },
    createTime:{
        type:Date
    },
    author:String,
    authorAvatar:{
        type:String,
        default:""
    },
    links:{
        type:Number,
        default:0
    }
},{
    toJson:{
        getters:true,
        virtuals:true
    },
    toObject:{
        getters:true,
        virtuals:true
    }
})

commnetSchema.path('createTime',get(function(v){
    return utils.formatDate(new Date(v),'yyyy-MM-dd hh:mm:ss')
}))
module.exports = mongoose.model('comment',commentSchema)
