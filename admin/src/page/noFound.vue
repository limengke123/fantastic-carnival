<template lang="pug">
    .no-found(@click="backToLogin") you came here for typing wrong url !!! click me back to login-page !!!

</template>

<script>
    export default {
        name: "no-found",
        methods:{
            backToLogin(){
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>