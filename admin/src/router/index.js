/**
 * Created by li on 2018/2/27 10:27.
 */
import Router from 'vue-router'
import Vue from 'vue'
import login from '../page/login.vue'
import article from '../page/article.vue'
Vue.use(Router)

const routes = [
    {
        path:"/",
        component:login
    },
    {
        path:'/article',
        component:article
    }
]

export default new Router({routes})