<template lang="pug">
    div login
        Button(text="Default" ,:handler="article")
        Input(:value="text" )
</template>

<script>
    import Input from '../components/general/input.vue'
    import Button from '../components/general/button.vue'
    export default {
        data(){
            return {
                text:"this is custom string"
            }
        },
        methods: {
            article(){
                //this.$router.push('/article')
                console.log(this)
            }
        },
        components: {
            Input,
            Button
        }
    }
</script>

<style lang="stylus" scoped>

</style>