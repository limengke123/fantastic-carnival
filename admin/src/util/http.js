/**
 * Created by li on 2018/3/1 9:10.
 */
import axios from 'axios'
import router from '../router/index'

//请求前的拦截
axios.interceptors.request.use(config=>{
    console.log(1111)
    if(sessionStorage.getItem('token')){
        config.headers.Authorization = "Bearer " + sessionStorage.getItem('token')
    }
    return config
},err =>{
    return Promise.reject(err)
})

//请求后的拦截
axios.interceptors.response.use(response => {
    return response
},err =>{
    if(err.response){
        console.log(err)
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

const http = axios.create({
    timeout:10000
})

exports.httpInstall = function(Vue,option={}){
    Vue.prototype.$http = http
}