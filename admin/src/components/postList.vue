<template lang="pug">
    ul.post-list.reset-list
        li.post-list-item(v-for="post in postList")
            article.post-thumb
                h3.post-title: a(href="javascript:void 0;") {{post['title']}}
                h6.post-time {{post['lastEditTime']}}
                p.post-content(v-text="post['excerpt']")
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    export default {
        data(){
            return {
                /*postList: [
                    {
                        title: "这是标题",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要",
                    }, {
                        title: "这是标题2",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要2",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    }, {
                        title: "这是标题3",
                        lastEditTime: "2018/3/1",
                        excerpt: "摘要3",
                    },
                ]*/
            }
        },
        computed: {
            ...mapState({}),
            ...mapGetters([
                    'postList'
                ]
            )
        },
        created(){
            console.log(this.postList)
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../styl/list.styl'
    @import '../styl/variable.styl'
    .post-list
        border-top 1px solid $border

    .post-list-item
        margin 0 25px
        padding 20px 0
        border-bottom 1px solid $border
        cursor pointer

    .post-thumb
        padding-left 5px
        &.published
            border-left 2px solid $green
        &.updated
            border-left 2px solid $yellow
        .post-title
            font-size 16px
            line-height 1.3
            font-weight 400
            margin 0 0 4px
            padding-bottom 0
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        &.active
            .post-title
                color $green
        &:hover
            .post-title
                color $green
        .post-content
            font-size 12px
            font-weight 400
            line-height 17px
            margin 0
            max-height (3 * @line-height)
            overflow hidden
            word-wrap break-word
            color $light
        .post-time
            color $light
            margin 0 0 6px

    .post-thumb-content
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
</style>