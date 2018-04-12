<template lang="pug">
    transition(name="fade")
        div(:class="prefixClass", :style="outerStyle", v-show="show")
            div(:class="innerClass", :style="styles")
</template>

<script>
    const prefix = `loading-bar`
    export default {
        name: 'loading-bar',
        data(){
          return {
              show:false,
              percent:0,
              status:'success'
          }
        },
        computed:{
            prefixClass(){
              return prefix
            },
            innerClass(){
                return [
                    `${this.prefixClass}-inner`,
                    {
                        [`${this.prefixClass}-inner-color-primary`]:this.color === 'primary' && this.status === 'success',
                        [`${this.prefixClass}-inner-failed-color-error`]:this.failedColor === 'error' && this.status === 'error',
                    }
                ]
            },
            outerStyle(){
              return {
                  height :`${this.height}px`
              }
            },
            styles(){
                const style = {
                    width :`${this.percent}%`,
                    height:`${this.height}px`
                }
                if (this.color !== 'primary' && this.status === 'success'){
                    style.backgroundColor = this.color
                }
                if (this.failedColor !== 'error' && this.status === 'error'){
                    style.backgroundColor = this.failedColor
                }

                return style
            }
        },
        props:{
            color:{
                type: String,
                default: 'primary'
            },
            failedColor:{
                type:String,
                default:'error'
            },
            height:{
                type:Number,
                default:2
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .loading-bar
        width 100%
        position fixed
        top 0
        left 0
        right 0
        z-index 2000
        &-inner
            transition width .2s linear
            &-color-primary
                background-color #2d8cf0
            &-failed-color-error
                background-color #ed3f14
</style>