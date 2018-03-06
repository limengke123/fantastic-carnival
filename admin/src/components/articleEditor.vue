<template lang="pug">
    section(:class="postSaved ? 'editor-active': ''")
        div(:class="postTitleSaved ? 'title-active': ''"): input.form-control.big.only-border-bottom(type="text",:value="postTitle",@input="updateTitle")
        .header-wrapper
            .half-container
                i.fa.fa-tags.tag-icon
                span.tag(v-for="tag in tags")
                    | {{tag['name']}}
                    i.delete-tag.fa.fa-close
                .tag.active
                    span(v-show="!tagInput") +
                    input.tag-input(type="text",v-show="tagInput",placeholder="使用回车键提交")
                    ul.search-list.reset-list(v-if="tagInput"): li.search-item(v-for="tag in tags") {{tag['name']}}
            .half-container.btn-group
                button.btn.btn-border(@click="deletePost") 删除草稿
                button.btn.btn-save 发布文章
        textarea#editor(style="opacity:1")
</template>

<script>
    import SimpleMDE from 'simplemde'
    import _ from 'lodash'
    import marked from '../util/marked'
    import {mapActions,mapGetters} from 'vuex'
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
              ],
              tagInput:true
          }
        },
        computed:{
            ...mapGetters([
                'postTitle',
                'postSaved',
                'postTitleSaved',
            ])
        },
        methods:{
            ...mapActions([
                'deletePost',
                'editPostTitle',
                'submitPostTitle',
                'savePostTitle'
            ]),
            updateTitle:_.debounce(function(e){
                console.log(e)
                this.editPostTitle()
            },500)
        },
        mounted(){
            const simpleMDE = new SimpleMDE({
                autoDownloadFontAwesome:false,
                element:this.$el.getElementsByTagName('textarea')[0],
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
        .tag-icon
            align-self center
            position relative
            top 5px
            color #4a4a4a
            margin-right 6px
            //margin-top 5px
        .tag
            padding 3px 0
            font-size 14px
            color $light
            border-bottom 2px solid $light
            margin-top 5px
            margin-right 20px
            position relative
            .delete-tag
                display none
            &:hover
                color $green
                border-bottom 2px solid $green
                .delete-tag
                    display inline
            &.active
                color $green
                border-bottom 2px solid $green
                position relative
            .search-list
                position absolute
                top 25px
                left -6px
                z-index 100
                width 100%
                padding 5px
                background #fff
                border 1px solid $border
                border-radius 4px
                box-shadow 0 6px 12px rgba(0,0,0,0.03)
                .search-item
                    color $light
                    padding-left 4px
                    &:hover
                        color $green
                    &+&
                        padding-top 10px
            .delete-tag
                display none
                position absolute
                right -8px
                top -3px
                font-size 12px
                cursor pointer
            .tag-input
                border none
                background transparent
                color $green
                font-style 14px
                outline 0
    .btn-group
        display flex
        justify-content flex-end
        .btn
            cursor pointer
            border 1px solid #c4c4c4
            color #2c3e50
            border-radius 3px
            padding 6px 10px
            text-align center
            outline 0
            background #fff
        .btn-border:hover
            border-color $green
        .btn-save
            color #fff
            background-color $green
            border-color $green
            margin-left 20px
    .editot-toolbar
        border-left 0
    .editor-active
        .CodeMirror
            border 1px solid $yellow
    .CodeMirror
        transition border 0.5s
        border-left 1px solid transparent
    .codeMirror-sided
        box-sizing border-box
    .editor-preview,
    .editor-preview-side
        background white
        padding: 0.2em 1.4em 0;
        font-family $body-font
        font-size $body-font-size
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        color $medium




</style>