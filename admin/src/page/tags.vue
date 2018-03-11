<template lang="pug">
    .tags-wrapper
        nav-side
        section.post-list-wrapper
            h3.page-title
                i.fa.fa-file-text-o
                |  标签列表
                i.fa.fa-plus.post-add
            post-list
        .post-edit
            article-editor
</template>

<script>
    import NavAside from '../components/navAside.vue'
    import PostList from '../components/postList.vue'
    import Article from '../components/articleEditor.vue'
    export default {
        components:{
            ["nav-side"]:NavAside,
            ["post-list"]:PostList,
            ['article-editor']:Article
        },
    }
</script>

<style lang="stylus" scoped>
    @import '../styl/variable.styl'
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
        .post-edit
            height 100%
            flex-grow 1
</style>