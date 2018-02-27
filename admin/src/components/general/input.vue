<template lang="pug">
    input(type="text",:value="value")
</template>

<script>
    export default {
        props:{
            value:{
                type:String,
                default:"this is a default string"
            }
        }
    }
</script>

<style lang="stylus" scoped>
    input
        font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        box-sizing border-box
        margin 0
        padding 4px 11px
        font-size 16px
        height 32px
        line-height 32px
        color rgba(0,0,0,0.65)
        border 1px solid #d9d9d9
        background-color #fff
        border-radius 4px
        transition all .3s
        /*width 100%*/
        &:hover
            border-color #40a9ff
        &:focus
            border-color #40a9ff
            box-shadow 0 0 0 2px rgba(24, 144, 255, 0.2)
            outline none

</style>