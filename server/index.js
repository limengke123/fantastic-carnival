/**
 * Created by li on 2018/1/8 17:06.
 */
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = reuqire('koa-router')({
    prefix : config.app.apiPath
})
const onerror = require('koa-onerror')

const mongoose = require('mongoose')
const controllers = reuqire('./controller/index.js')
