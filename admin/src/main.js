/**
 * Created by li on 2018/2/10 9:38.
 */
import Vue from 'vue'
import App from './app.vue'
import store from './store/index'
import resource from 'vue-resource'
import router from './router'

import myMessage from './components/general/index'

Vue.use(myMessage)
Vue.use(resource)

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    store,
    router,
    render:h => h(App)
}).$mount(root)

