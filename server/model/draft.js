/**
 * Created by li on 2018/1/19 10:13.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const utils = require('../util')
const draftSchema = new Schema({
    title:String,
    tags:[{
        type:Schema.Types.ObjectId,
        ref:'tag'
    }],
    createTime:{
        type:Date
    },
    lastEditTime:{
        type:Date,
        default:Date.now
    },
    excerpt:String,
    content:String,
    article:{
        type:Schema.Types.ObjectId,
        ref:'article'
    },
    draftPublished:Boolean
},{
    versionKey:false,
    skipVersioning:{
        tags:true
    },
    toJSON:{
        getters:true,
        virtuals:true
    },
    toObject:{
        getters:true,
        virtuals:true
    }
})
draftSchema
    .path('createTime')
    .get(function(v){
        console.log(v)
        return utils.formatDate(new Date(v),'yyyy-MM-dd hh:mm:ss')
    })
draftSchema
    .path('lastEditTime')
    .get(function(v){
        return utils.formatDate(new Date(v),'yyyy-MM-dd hh:mm:ss')
    })
const draft = mongoose.model('draft',draftSchema)
module.exports = draft