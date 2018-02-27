<template lang="pug">
    div article
        button(@click="back") home
</template>

<script>
    export default {
        methods:{
            back(){
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>