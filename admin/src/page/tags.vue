<template lang="pug">
    .tags-wrapper
        nav-side
        section.post-list-wrapper
            h3.page-title(v-if="tagActive === null")
                i.fa.fa-tags
                |  根据标签搜索文章
            ul.rest-list.tag-list(v-if="tagActive !== null")
                li.tag.active
                    span(v-show="!tagActive['editing']")
                    | {{tagActive['name']}}
                    i.hover-icon.fa.fa-close(title="清除", @click="blurTag", v-show="!tagActive['editing']")
                    i.hover-icon.fa.fa-edit(title="编辑",  @click="modifyTag", v-show="!tagActive['editing']")
                    i.hover-icon.fa.fa-trash-o(title="删除", @click="deleteTags", v-show="!tagActive['editing']")
                    input.tag-input(type="text", v-if="tagActive['editing']", v-model="tagActive['newName']", placeholder="使用回车提交", @keyup.13="saveTag(tagActive)")
            ul.reset-list.tag-list(v-show="tags.length !==1 || tagActive==null")
                li.tag(v-for="tag in tags", v-show="tag !== tagActive")
                    span(@click="searchTag(tag)", v-show="!tag['editing']") {{tag['name']}}
            post-list
        .post-edit
            article-editor
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
                tags:[]
            }
        },
        methods:{
            ...mapActions([
                'getAllPost',
                'getAllTags',
                'deleteTag',
            ]),
            blurTag(){
                this.tagActive = null
                this.getAllPost()
            },
            modifyTag(tag){
                console.log(this.tagActive)
                this.tagActive.newName = tag.name
                this.tagActive.editing = true
            },
            deleteTags(){
                this.deleteTag(this.tagActive.id)
                    .then(resp => {
                        this.getAllPost()
                        this.tagActive = null
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
            }
        },
        computed:{
            ...mapGetters([
                'currentPostId'
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
        .post-edit
            height 100%
            flex-grow 1
            overflow-y auto
</style>