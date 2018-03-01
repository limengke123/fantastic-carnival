/**
 * Created by li on 2018/3/1 10:59.
 */


//token 没必要这样玩 太麻烦了 先不导出了

import {SET_TOKEN,DEL_TOKEN} from '../mutation_type'

const token = {
    state:{
        token:sessionStorage.getItem('token')
    },
    mutations:{
        [SET_TOKEN](state,token){
            state.token = token
            sessionStorage.setItem('token',token)
        },
        [DEL_TOKEN](state){
            state.token = null
            sessionStorage.removeItem('token')
        }
    },
    actions:{
        createToken({commit}){

        },
        deleteToken({commit}){
            commit(DEL_TOKEN)
        }
    },
    getters:{
        Token(state){
            return state.token
        }
    }
}

export default token
