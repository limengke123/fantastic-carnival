<template lang="pug">
    button(@click="_handler" ,v-text="text" ,:class="classes")
</template>

<script>
    /**
     * typeMap:
     * 1. inherit
     * 2. normal
     * 3. danger
     * */
    export default {
        name:"Button",
        data(){
          return {
          }
        },
        props:{
            text:{
                type:String,
            },
            handler:{
                type:Function
            },
            type:{
                type:String
            }
        },
        computed:{
          classes(){
              return this.type ? this.type : ""
          }
        },
        methods:{
            _handler(){
                if(this.handler){
                    this.handler()
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    button
        line-height 32px
        font-weight 400
        text-align center
        background-image none
        border 1px solid #d9d9d9
        white-space nowrap
        font-size 14px
        border-radius 4px
        height 32px
        padding 0 15px
        user-select none
        transition all .3s cubic-bezier(0.645, 0.045, 0.355, 1)
        color rgba(0,0,0,0.65)
        background-color #fff
        //border-color #d9d9d9
        cursor pointer
        display inline-block
        &:active
            border-color #096dd9
            background-color
            color #096dd9
        &:hover
            border-color #40a9ff
            color #40a9ff
            background-color #ecf5ff
        &:focus
            color #40a9ff
            border-color #40a9ff;
            background-color #ecf5ff
            outline none
    .normal
        background-color #1890ff
        border-color #1890ff
        color #fff
        &:hover
            background-color #40a9ff
            border-color #40a9ff
            color #fff
        &:focus
            background-color #40a9ff
            border-color #40a9ff
            color #fff
        &:active
            background-color #096dd9
            border-color #096dd9
            color #fff
    .danger
        color #f5222d
        background-color #f5f5f5
        border-color #d9d9d9
        &:hover
            background-color #ff4d4f
            border-color #ff4d4f
            color #fff
        &:focus
            background-color #ff4d4f
            border-color #ff4d4f
            color #fff
        &:active
            background-color #cf1322
            border-color #cf1322
            color #fff

</style>