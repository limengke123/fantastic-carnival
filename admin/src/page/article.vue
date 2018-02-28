<template lang="pug">
    div article

</template>

<script>
    import axios from 'axios'
    export default {
        methods:{
        },
        beforeRouteEnter(to, from, next) {
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