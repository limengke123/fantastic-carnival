/**
 * Created by li on 2018/2/27 13:37.
 */
//注册全局的组件message,loadingBar
import Message from './message/index.js'
import LoadingBar from './loading-bar/index.js'


import Button from './button.vue'
import Input from './input.vue'

const componentsArr = [
    Button,
    Input,
    //LoadingBar,
]

const install = function (Vue, options = {}) {
    Vue.prototype.$message = Message
    Vue.prototype.$loading = LoadingBar
    componentsArr.map(component => Vue.component(component.name,component))
}
export default {
    install
}