/**
 * Created by li on 2018/2/27 10:27.
 */
import Router from 'vue-router'
import Vue from 'vue'
import login from '../page/login.vue'
import article from '../page/article.vue'
import axios from 'axios'
Vue.use(Router)

const routes = [
    {
        path:"/",
        name:"login",
        component:login
    },
    {
        path:'/article',
        component:article,
        name:"article",
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