<template lang="pug">
    .tags-wrapper
        nav-side
        section.post-list-wrapper
            h3.page-title(v-if="tagActive === null")
                i.fa.fa-tags
                |  根据标签搜索文章
            ul.rest-list.tag-list(v-if="tagActive !== null")
                li.tag.active
                    span(v-show="!flag") {{tagActive['name']}}
                    i.hover-icon.fa.fa-close(title="清除", @click="blurTag", v-show="!flag")
                    i.hover-icon.fa.fa-edit(title="编辑",  @click="modifyTag", v-show="!flag")
                    i.hover-icon.fa.fa-trash-o(title="删除", @click="deleteTags", v-show="!flag")
                    input.tag-input(type="text", v-if="flag", v-model="tagActive['newName']", placeholder="使用回车提交", @keyup.13="saveTag")
                    i.fa.fa-check.sure(v-show="flag", title="确认", @click="saveTag")
                    i.fa.fa-arrow-left.back(v-show="flag", title="返回", @click="back")
            ul.reset-list.tag-list(v-show="tags.length !==1 || tagActive==null")
                li.tag(v-for="tag in tags", v-show="tag !== tagActive")
                    span(@click="searchTag(tag)") {{tag['name']}}
            post-list
        .post-edit
            article-editor(v-if="currentPostId !== null")
</template>

<script>
    import NavAside from '../components/navAside.vue'
    import PostList from '../components/postList.vue'
    import Article from '../components/articleEditor.vue'
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name:"tags",
        components:{
            ["nav-side"]:NavAside,
            ["post-list"]:PostList,
            ['article-editor']:Article
        },
        data(){
            return {
                tagActive:null,
                flag:false,
                tags:[]
            }
        },
        methods:{
            ...mapActions([
                'getAllPost',
                'getAllTags',
                'deleteTag',
                'updateTag',
            ]),
            blurTag(){
                this.tagActive = null
                this.flag = false
                this.getAllPost()
            },
            modifyTag(){
                this.tagActive.newName = this.tagActive.name
                this.tagActive.editing = true
                this.flag = true
            },
            deleteTags(){
                this.deleteTag(this.tagActive.id)
                    .then(resp => {
                        this.getAllPost()
                        const position = this.tags.indexOf(this.tagActive)
                        this.tags.splice(position,1)
                        this.tagActive = null
                        this.flag = false
                    }).catch(e => {
                        console.log(e)
                        this.$message({
                            type:'error',
                            message:"删除失败"
                        })
                })
            },
            searchTag(tag){
                this.tagActive = tag
                this.getAllPost(tag.id)
            },
            back(){
                this.flag = false
            },
            saveTag(){
                if(this.tagActive.newName === "" || this.tagActive.newName === this.tagActive.name){
                    return false
                } else {
                    this.updateTag({
                        id:this.tagActive.id,
                        name:this.tagActive.newName
                    }).then(resp => {
                        if(resp.success === true){
                            this.tagActive.name = this.tagActive.newName
                            this.$message({
                                type:"success",
                                message:"修改tag成功！"
                            })
                            this.flag = false
                        } else {
                            this.$message({
                                type:'error',
                                message:"标签重名"
                            })
                        }
                    }).catch(e => {
                        this.$message({
                            type:"error",
                            message:"保存失败"
                        })
                    })
                }

            }
        },
        computed:{
            ...mapGetters([
                'currentPostId',
            ])
        },
        mounted(){
            this.getAllTags()
                .then(resp => {
                    this.tags = resp.data
                    this.getAllPost()
                })
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../styl/variable.styl'
    @import '../styl/list.styl'
    .tags-wrapper
        height 100%
        display flex
        .post-list-wrapper
            width 300px
            height 100%
            overflow-y auto
            border-right 1px solid $border
            flex-shrink 0
            .page-title
                padding-left 25px
                color $light
                cursor default
                font-weight 400
                .post-add
                    transition $transition
                    cursor pointer
                    float right
                    margin-right 10px
                    margin-top 2px
                    &:hover
                        color $green
            .tag-list
                padding 15px 0
                margin 0 25px
                .tag
                    position relative
                    display inline-block
                    padding 3px 0
                    font-size 14px
                    color $light
                    border-bottom 2px solid $light
                    margin-top 5px
                    margin-right 20px
                    cursor pointer
                    transition all 0.2s ease
                    &:hover
                        color $green
                        border-bottom 2px solid $green
                .active
                    cursor default
                    .hover-icon
                        display none
                        font-size 16px
                        margin-left 5px
                    &:hover
                        color $green
                        border-bottom 2px solid $green
                        .hover-icon
                            display inline-block
                            cursor pointer
                    .tag-input
                        border none
                        background transparent
                        color $green
                        font-size 14px
                        outline 0
                    .back
                        cursor pointer
                        margin-right 10px
                    .sure
                        cursor pointer
                        margin-right 5px
        .post-edit
            height 100%
            flex-grow 1
            overflow-y auto
</style>