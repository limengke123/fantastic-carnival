'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tagSchema = new Schema({
    name:String
},{
    versionKey:false,
    toJSON:{
        getters:true,
        virtuals:true
    },
    toObject:{
        getters:true,
        virtuals:true
    }
})

module.exports = mongoose.model('tag',tagSchema)
