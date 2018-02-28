/**
 * Created by li on 2018/2/27 13:37.
 */
//注册全局的组件message
import Message from './message/index.js'

import Button from './button.vue'
import Input from './input.vue'

const componentsArr = [
    Button,
    Input
]

const install = function (Vue, options = {}) {
    Vue.prototype.$message = Message
    componentsArr.map(component => Vue.component(component.name,component))
}
export default {
    install
}