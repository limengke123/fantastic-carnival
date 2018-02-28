<template lang="pug">
    div article

</template>

<script>
    import axios from 'axios'
    export default {
        methods:{

        },
        beforeRouteEnter(to, from, next) {
            /*next(vm => {
                //console.log(to,from,next)
                vm.$http.get('/api/tokens/check')
                    .then(resp=>{
                        console.log(resp)
                        if(resp.statusText==="OK"){
                            next()
                        }
                    }).catch(e=>{console.log(vm);vm.$session.checkLogin(vm,e)})
            })*/
            console.log(to)
            if(!sessionStorage.getItem('token')){
                return next('/')
            }
            axios.get('/api/tokens/check',{
                headers:{
                    Accept:'application/json',
                    Authorization:'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(resp=>{
                if(resp.statusText==="OK"){
                    next()
                }else {
                    next('/')
                }
            }).catch(e=>next('/'))
        },
    }
</script>

<style lang="stylus" scoped>

</style>