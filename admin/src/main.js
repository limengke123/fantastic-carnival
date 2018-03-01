/**
 * Created by li on 2018/2/10 9:38.
 */
import Vue from 'vue'
import App from './app.vue'
import store from './store/index'
import router from './router'

import {httpInstall} from './util/http'

import installComponent from './components/general/index'
import {session} from './util/session'
import filters from './util/filter'




//注入自定义组件
Vue.use(installComponent)

//注入自定义session处理
Vue.use(session)

//注入自定义filter
Object.keys(filters).map(key => {
    Vue.filter(
        key,
        filters[key]
    )
})


Vue.use(httpInstall)

const root = document.createElement('div')
document.body.appendChild(root)



new Vue({
    store,
    router,
    render:h => h(App)
}).$mount(root)

