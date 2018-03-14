import React from 'react'

import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router'

import App from './containers/app'

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

const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/' breadcrumbName="首页" component={App}>
            <IndexRoute name="home" getComponent={getHomePage}/>
            <Route name="home" path='home' getComponent={getHomePage}/>
            <Route name="tag" path='tag' breadcrumbName="标签" getComponent={getTagPage}/>
        </Route>

        {/** 这里是重定向 **/}
        <Route path='/404' getComponent={getNoFoundPage}/>
        <Redirect path='*' to='/404'/>
    </Router>
)

export default Routes