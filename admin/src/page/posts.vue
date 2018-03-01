<template lang="pug">
    .article-wrapper
        nav-side
        section.post-list-wrapper
            h3.page-title
                i.fa.fa-file-text-o
                |  文章列表
                i.fa.fa-plus.post-add
            post-list
</template>

<script>
    import NavAside from '../components/navAside.vue'
    import PostList from '../components/postList.vue'
    export default {
        components:{
            ["nav-side"]:NavAside,
            ["post-list"]:PostList,
        },
        methods:{
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
            .page-title
                padding-left 25px
                color $light
                cursor default
                .post-add
                    transition $transition
                    cursor pointer
                    float right
                    margin-right 10px
                    margin-top 2px
                    &:hover
                        color $green

</style>