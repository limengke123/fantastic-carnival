/**
 * Created by li on 2018/2/27 10:27.
 */
import Router from 'vue-router'
import Vue from 'vue'
import {http} from '../util/http'

//引入自定义组件
// import login from '../page/login.vue'
// import posts from '../page/posts.vue'
// import tags from '../page/tags.vue'

//懒加载 首页登录效果明显
const login = () => import(/* webpackChunkName: "login" */ '../page/login.vue')
const posts = () => import(/* webpackChunkName: "posts" */ '../page/posts.vue')
const tags = () => import(/* webpackChunkName: "tags" */ '../page/tags.vue')
const noFound = () => import(/* webpackChunkName: "no-found" */ '../page/noFound.vue')

/**
 * 如下是官网提供的异步组件的完整写法
 * */

// const AsyncComp = () => ({
//     // 需要加载的组件。应当是一个 Promise
//     component: import('./MyComp.vue'),
//     // 加载中应当渲染的组件
//     loading: LoadingComp,
//     // 出错时渲染的组件
//     error: ErrorComp,
//     // 渲染加载中组件前的等待时间。默认：200ms。
//     delay: 200,
//     // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
//     timeout: 3000
// })

//注入
Vue.use(Router)

const routes = [
    {
        path:"/",
        name:"login",
        component:login,
        meta:{
            title:"这里登录啦"
        }
    },
    {
        path:'/posts',
        component:posts,
        name:"posts",
        meta:{
            requireAuth:true,
            title:"这里写文章啦"
        }
    },
    {
        path:'/tags',
        component:tags,
        name:"tags",
        meta:{
            requireAuth:true,
            title:"这里整理标签啦"
        }
    },
    {
        path:"/404",
        component:noFound,
        name:'noFound',
        meta:{
            title:"404 not found !!!"
        }
    },
    {
        path:'/admin/*',
        redirect:'/404'
    }
]

const router = new Router({
    //先用hashHistory，后面解决这个问题
    //mode:'history',
    routes
})

router.beforeEach((to,from,next) => {
    //console.log(Vue)
    Vue.prototype.$loading.start()
    if (to.meta.title) {
      document.title = to.meta.title
    }
    if(to.matched.some(record => record.meta.requireAuth)){
        http.get('/api/tokens/check')
            .then(resp => {
                console.log(resp)
                if(resp.data.success === true){
                    next()
                } else {
                    console.log(to)
                    Vue.prototype.$message({
                        type:'error',
                        message:resp.data.message
                    })
                    next({
                        path:'/',
                        query:{
                            redirect:to.path
                        }
                    })
                }
            })
    } else {
        next()
    }
})

router.afterEach(route => {
    console.log(route)
    if(route.query.redirect){
        //redirect有值表明此时错误跳转
        Vue.prototype.$loading.error()
    } else {
        Vue.prototype.$loading.finish();
    }
});


export default router
