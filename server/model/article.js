/**
 * Created by li on 2018/1/10 16:21.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const utils = require('../util')

const articleSchema = new Schema({
    title:String,
    visits:{
        type:Number,
        default:0
    },
    tags:[{
        type:Schema.Types.ObjectId,
        ref:'tag'
    }],
    createTime:{
        type:Date,
        default:Date.now()
    },
    lastEidtTime:{
        type:Date,
        default:Date.now()
    },
    excerpt:String,
    content:String,
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'comment'
    }]
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

