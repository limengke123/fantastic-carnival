<template lang="pug">
    div.inputWrapper
        i.preIcon(v-if="icon",:class="['fa','fa-' + icon]")
        input(type="text",
        :value="value",
        :placeholder="placeholder",
        ref="input",
        @input="updateValue($event.target.value)",
        :type="type",
        autoFocus="autoFocus",
        @keyup.esc="handleClose",
        :class="[icon?'pre':'',clearIcon?'suffix':'']"
        )
        i.clearIcon(v-show="clearIcon && value", class="fa fa-close" ,@click="handleClose")
</template>

<script>
    export default {
        name: "Input",
        props: {
            value: {
                type: String,
                "default": "this is a default string"
            },
            placeholder: {
                type: String,
                "default": ""
            },
            type: String,
            clearIcon: Boolean,
            autoFocus: Boolean,
            icon: {
                type: String,
                "default": ""
            }
        },
        methods: {
            updateValue(value){
                this.$emit('input', value)
            },
            handleClose(){
                this.$emit('input', "")
                this.$refs.input.focus()
            },
            test(){
                console.log("inner test")
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .inputWrapper
        position relative
        display inline-block
        input
            font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
            box-sizing border-box
            margin 0
            padding 4px 11px
            font-size 16px
            height 32px
            line-height 32px
            color rgba(0, 0, 0, 0.8)
            border 1px solid #d9d9d9
            background-color #fff
            border-radius 4px
            transition all .3s
            width 100%
            /*width 100%*/
            &:hover
                border-color #40a9ff
            &:focus
                border-color #40a9ff
                box-shadow 0 0 0 2px rgba(24, 144, 255, 0.2)
                outline none
            &.suffix
                padding-right 30px
            &.pre
                padding-left 30px
        .clearIcon
            position absolute
            right 10px
            top 7px
            cursor pointer
            color rgba(0, 0, 0, 0.65)
            &:hover
                color #333
        .preIcon
            position absolute
            left 10px
            top 7px
            color rgba(0, 0, 0, 0.65)
</style>