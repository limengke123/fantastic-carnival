/**
 * Created by li on 2018/2/11 10:41.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import article from './article'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        article
    }
})

export default store