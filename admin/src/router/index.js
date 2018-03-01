/**
 * Created by li on 2018/2/27 10:27.
 */
import Router from 'vue-router'
import Vue from 'vue'
import axios from 'axios'

//引入自定义组件
import login from '../page/login.vue'
import posts from '../page/posts.vue'
import tags from '../page/tags.vue'

//注入
Vue.use(Router)

const routes = [
    {
        path:"/",
        name:"login",
        component:login
    },
    {
        path:'/posts',
        component:posts,
        name:"posts",
        meta:{
            requireAuth:true
        }
    },
    {
        path:'/tags',
        component:tags,
        name:"tags",
        meta:{
            requireAuth:true
        }
    }
]

const router = new Router({
    routes
})

router.beforeEach((to,from,next) => {
    if(to.matched.some(record => record.meta.requireAuth)){
        axios.get('/api/tokens/check')
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