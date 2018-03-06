<template lang="pug">
    .article-wrapper
        nav-side
        section.post-list-wrapper
            h3.page-title
                i.fa.fa-file-text-o
                |  文章列表
                i.fa.fa-plus.post-add(@click="createPost")
            post-list
        .post-edit
            article-editor
</template>

<script>
    import NavAside from '../components/navAside.vue'
    import PostList from '../components/postList.vue'
    import ArticleEditor from '../components/articleEditor.vue'
    import {mapActions} from 'vuex'
    export default {
        components:{
            ["nav-side"]:NavAside,
            ["post-list"]:PostList,
            ["article-editor"]:ArticleEditor,
        },
        mounted(){
            console.log(this.$store)
            this.getAllPost()
        },
        methods:{
            ...mapActions([
                "createPost",
                'getAllPost'
            ])
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../styl/variable.styl'
    .article-wrapper
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
        .post-edit
            height 100%
            flex-grow 1
</style>