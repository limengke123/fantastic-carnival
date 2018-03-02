<template lang="pug">
    section
        div: input.form-control.big.only-border-bottom(type="text")
        .header-wrapper
            .half-container
                i.fa.fa-tags(style="margin-right:5px;")
                span.tag(v-for="tag in tags")
                    | {{tag['name']}}
                    i.delete-tag.fa.fa-close
                .tag.active
                    span +
                    input.tag-input(type="text",placeholder="使用回车键提交")
                    ul.search-list.reset-list: li.search-item(v-for="tag in tags") {{tag['name']}}
            .half-container.btns
                button.btn.btn-save.r 发布文章
                button.btn.btn-border.r 删除草稿
        textarea#editor(style="opacity:1")
</template>

<script>
    import SimpleMDE from 'simplemde'
    import marked from '../util/marked'
    export default {
        data(){
          return {
              tagsToAdd:[
                  {
                      name:"一条tag"
                  }
              ],
              tags:[
                  {
                      name:"tags!!!"
                  },{
                      name:"tags222"
                  },
              ]
          }
        },
        mounted(){
            const simpleMDE = new SimpleMDE({
                autoDownloadFontAwesome:false,
                element:this.$el.getElementsByTagName('textarea')[0],
                //element:document.getElementById('editor'),
                previewRender:function (plainText) {
                    return marked(plainText)
                },
                spellChecker:false
            })
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../styl/code.styl'
    @import '../styl/list.styl'
    @import '../styl/variable.styl'
    .title-active
        .big
            border 1px solid $yellow
    .form-control
        color $black
        box-sizing border-box
        padding 10px 8px
        width 100%
        height auto
        box-shadow none
        border 1px solid $border
        background-color #fff
        outline 0
    .big
        transition border 0.5s
        padding 13px 20px 13px 30px
        font-size 26px
    .only-border-bottom
        border 1px solid transparent
        border-bottom 1px solid $border
    .header-wrapper
        display flex
        //justify-content space-between
        padding 15px
        box-sizing border-box
    .half-container
        display flex
        flex-grow 1
        .tag
            padding 3px 0
            font-size 14px
            color $light
            border-bottom 2px solid $light
            margin-top 5px
            margin-right 20px
            .delete-tag
                display none
            &:hover
                color $green
                border-bottom 2px solid $green
                .delete-tag
                    display inline
    .btns
        display flex
        justify-content flex-end


</style>