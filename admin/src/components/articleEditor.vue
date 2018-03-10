<template lang="pug">
    section(:class="postSaved ? '': 'editor-active'")
        div(:class="postTitleSaved ? '': 'title-active'"): input.form-control.big.only-border-bottom(type="text",:value="postTitle",@input="updateTitle")
        .header-wrapper
            .half-container
                i.fa.fa-tags.tag-icon
                span.tag(v-for="tag in tags")
                    | {{tag['name']}}
                    i.delete-tag.fa.fa-close(@click="deleteTag(tag.id)")
                .tag.active
                    span(v-show="!tagInput",class="addIcon",@click="addTag") +
                    input.tag-input(type="text",v-show="tagInput",placeholder="使用回车键提交",v-model="tagNew",@keyup.13="submitTag")
                    ul.search-list.reset-list(v-if="tagInput",v-show="tagsToAdd.length"): li.search-item(v-for="tag in tagsToAdd",@click="submitTag(tag['name'])") {{tag['name']}}
            .half-container.btn-group
                button.btn.btn-border(@click="deletePost") 删除草稿
                button.btn.btn-save(@click="publish") 发布文章
        textarea#editor(style="opacity:1")
</template>

<script>
    import SimpleMDE from 'simplemde'
    import _ from 'lodash'
    import {marked} from '../util/marked'
    import {mapActions, mapGetters} from 'vuex'
    import {http} from '../util/http'
    let simpleMDE
    const updateTitleDebounce = _.debounce((context, title) => {
        context.submitPostTitle(title)
            .then(() => {
                context.savePostTitle()
            }).catch(e => {
            console.log(e)
        })
    }, 1000)
    export default {
        data(){
            return {
                tagsToAdd: [],
                tags: [],
                tagInput: false,
                draftPublished:'',
                tagNew:'',
                change:true
            }
        },
        computed: {
            ...mapGetters([
                'postTitle',
                'postSaved',
                'postTitleSaved',
                'currentPostId',
            ])
        },
        methods: {
            ...mapActions([
                'deletePost',
                'editPostTitle',
                'submitPostTitle',
                'savePostTitle',
                'editPost',
                'modifyContent',
                'submitPostExcerpt',
                'savePost',
                'getDraft',
                'postTagsModify',
                'updateDraftTags',
                'publishPost',
            ]),
            updateTitle(e) {
                this.editPostTitle()
                updateTitleDebounce(this, e.target.value)
            },
            addTag(){
                this.tagInput = true
                this.tagNew = ''
                this.searchTags()
            },
            searchTags(val){
                http.get('/api/tags',{
                    params:{
                       'start-with':val
                    }
                }).then(resp => {
                    if(resp.status === 200){
                        this.tagsToAdd = resp.data.data
                    }
                })
            },
            submitTag(val){
                /**
                 * 鼠标点击和input回车都是这个函数 val 可能是点击的值也可能是 事件对象
                 * 这里需要判断
                 * */
                this.tagInput = false
                let tag = typeof val === 'object' ? this.tagNew : val
                if(tag === ''){
                    return
                }
                http.post('/api/tags',{name:tag})
                    .then(resp => {
                        if(resp.status === 200){
                            /**
                             * 先不管有没有成功
                             * 如果在这篇文章已经有这个tags时候，就不做
                             * 当然可以在发请求前对文字比较 这里是对tags的id比较
                            */
                            const id = resp.data.data.id
                            if(this.tags.some(item => item.id === id)){
                                return
                            }
                            let newTagArr = this.tags.map(item => {
                                return item.id
                            })
                            newTagArr.push(id)
                            //数据库更新下草稿的标签id
                            this.updateDraftTags(newTagArr)
                                .then(res=>{
                                    this.tags = res.data.tags
                                    this.postTagsModify(res.data.lastEditTime)

                                })
                        }
                    })
            },
            deleteTag(id){
                let newTagArr = this.tags.filter(tags => tags.id !== id)
                this.updateDraftTags(newTagArr).then(res => {
                    if(res.success === true){
                        this.tags = res.data
                        this.postTagsModify(res.data.lastEditTime)
                    }
                })
            },
            publish(){
                if(!this.postSaved || !this.postTitleSaved){
                    this.$message({
                        type:'warning',
                        message:"文章保存中，请重试"
                    })
                }
                this.publishPost()
                    .then(resp => {
                        console.log(resp)
                        this.$message({
                            type:'success',
                            message:"发布成功"
                        })
                    }).catch(e=>{
                        this.$message({
                            type:'error',
                            message:"发布失败"
                        })
                })
            }
        },
        mounted(){
            /**
             * 挂载这个编辑器
             * */
            console.log(marked)
             simpleMDE = new SimpleMDE({
                //toolbar: ["bold", "italic", "heading", "|", "quote"],
                autoDownloadFontAwesome: false,
                element: this.$el.getElementsByTagName('textarea')[0],
                previewRender: function (plainText) {
                    return marked(plainText)
                },
                spellChecker: false
            })
            let postDraft = _.debounce(() => {
                this.modifyContent(simpleMDE.value())
            }, 1000)

            //修改内容
            //每次进来的时候都会触发一次change事件，这里的change属性区别
            //change 为true的时候不给dispatch editPost
            simpleMDE.codemirror.on('change', () => {
                if(this.change === true){
                    this.change = false
                    return false
                }
                if (this.postSaved) {
                    this.editPost()
                }
                postDraft()
            })

            this.change = true

            //赋值
            if(this.currentPostId){
                this.getDraft()
                    .then(resp => {
                        console.log('-----',resp)
                        this.tagNew = ''
                        this.tagInput = false
                        this.tags = resp.data.tags
                        this.$nextTick(() => {
                            simpleMDE.value(resp.data.content)
                        })
                    }).catch(e => {
                        this.$message({
                            type:"error",
                            text:e
                        })
                })
            }
        },
        beforeDestroy(){
            simpleMDE.toTextArea()
            let editor = document.getElementById('editor')
            editor.outerHTML = editor.outerHTML
        },
        watch:{
            currentPostId(val,oldVal){
                this.change = true
                if(val != null){
                    this.getDraft(val).then(res => {
                        if(res.success === true){
                            this.tagNew = ''
                            this.tagInput = false
                            this.tags = res.data.tags
                            this.$nextTick(() => {
                                simpleMDE.value(res.data.content)
                            })
                        }
                    })
                }
            }
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
        .addIcon
            cursor pointer
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
                box-shadow 0 6px 12px rgba(0, 0, 0, 0.03)
                .search-item
                    color $light
                    padding-left 4px
                    cursor pointer
                    &:hover
                        color $green
                        background-color $codebg
                    & + &
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

    .editor-toolbar
        border-left 0

    .editor-active .CodeMirror
        border 1px solid $yellow

    .CodeMirror
        transition border 0.5s
        border-left 1px solid transparent

    .CodeMirror-sided
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