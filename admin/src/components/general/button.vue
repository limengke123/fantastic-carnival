<template lang="pug">
    button(@click="_handler" v-text="text")
</template>

<script>
    export default {
        data(){
          return {
              isClicked:false
          }
        },
        props:{
            text:{
                type:String,
            },
            handler:{
                type:Function
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
        line-height 1.5
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

</style>