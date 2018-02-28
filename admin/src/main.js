/**
 * Created by li on 2018/2/10 9:38.
 */
import Vue from 'vue'
import App from './app.vue'
import store from './store/index'
import resource from 'vue-resource'
import router from './router'

//axios初始化
import axios from 'axios'

import installComponent from './components/general/index'
import {session} from './util/session'
import filters from './util/filter'

axios.interceptors.request.use(config=>{
    if(sessionStorage.getItem('token')){
        config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
},err =>{
    return Promise.reject(err)
})
axios.interceptors.response.use(response => {
    return response
},err =>{
    if(err.response){
        switch (err.response.status){
            case 401:
                router.replace({
                    path:'/',
                    query:{
                        redirect:router.currentRoute.fullPath
                    }
                })
        }
    }
    return Promise.reject(err)
})

//注入自定义组件
Vue.use(installComponent)

//注入自定义session处理
Vue.use(session)

//注入自定义filter
for(let key in filters){
    Vue.filter(
        key,
        filters[key]
    )
}



Vue.use(resource)

const root = document.createElement('div')
document.body.appendChild(root)



new Vue({
    store,
    router,
    render:h => h(App)
}).$mount(root)

