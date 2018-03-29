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
        path:'*',
        redirect:'/404'
    }
]

const router = new Router({
    //先用hashHistory，后面解决这个问题
    // mode:'history',
    routes
})

router.beforeEach((to,from,next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    if(to.matched.some(record => record.meta.requireAuth)){
        http.get('/api/tokens/check')
            .then(resp => {
                if(resp.statusText === "OK"){
                    next()
                }
            })
    } else {
        next()
    }
})



export default router
