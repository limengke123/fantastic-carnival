import React from 'react'

import {Router, Route, IndexRoute, browserHistory, Redirect, hashHistory} from 'react-router'

import createHistory from 'history/createHashHistory'

import {withEachRouter} from './hoc/index'

import $loading from './components/common/loading-bar/index'

import App from './containers/app'

// const history = createHistory()

// console.log(Route)

// let Route1 = Object.assign(Route,{})

//Route1 = withEachRouter(Route1)

// console.log(Route1)
//IndexRoute = withEachRouter(IndexRoute)


const getHomePage = (location,callback) => {
    require.ensure([],function(require){
        const Home = require('./containers/Home').default
        document.title = "个人博客"
        callback(null,Home)
    },'home')
}

const getTagPage = (location,callback) => {
    require.ensure([],function(require){
        const Tag = require('./containers/Tag').default
        document.title = "文章标签"
        callback(null,Tag)
    },'tag')
}

const getNoFoundPage = (location, callback) => {
    require.ensure([], function(require){
        const NoFound = require('./containers/NoFound').default
        document.title = "没找到页面"
        callback(null,NoFound)
    },'noFound')
}

const getTestPage = (location, callback) => {
    require.ensure([], function(require){
        const Test = require('./containers/test').default
        document.title = "测试页面"
        callback(null, Test)
    },'test')
}

const getDetailPage = (location,callback) => {
    require.ensure([], function(require){
        const ArticleDetail = require('./containers/article').default
        document.title = "文章页面"
        callback(null, ArticleDetail)
    },'articleDetail')
}

const Routes = () => (
    <Router history={hashHistory}>
        <Route path='/' breadcrumbName="首页" component={App}>
            <IndexRoute name="home" getComponent={getHomePage}/>
            <Route name="home" path='/home' getComponent={getHomePage}/>
            <Route name="tag" path='/tag' breadcrumbName="标签" getComponent={getTagPage}/>
            <Route name="articleDetail" path='article/:id' breadcrumbName="文章" getComponent={getDetailPage}/>
        </Route>

        {/** 测试页面 **/}
        <Route name="test" path='test' breadcrumbName="测试" getComponent={getTestPage}/>
        {/*/!** 这里是重定向 **!/*/}
        {/*<Route path='/404' getComponent={getNoFoundPage}/>*/}
        {/*<Redirect path='/*' to='/404'/>*/}
    </Router>
)

export default Routes