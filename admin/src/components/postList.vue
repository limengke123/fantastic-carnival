<docs>
    #post['draftPublished']?'published':post['article-item']?'updated':'' , {'active':post['id'] === currentPostId}
    #这里的article-item 有点问题
    #判断是否是更新
</docs>
<template lang="pug">
    ul.post-list.reset-list
        li.post-list-item(v-for="(post,index) in postList", @click="focus(index)")
            article.post-thumb(:class="[post['draftPublished']?'published':post['article']?'updated':'',{'active':post['id'] === currentPostId}]")
                h3.post-title: a(href="javascript:void(0);") {{post['title']}}
                h6.post-time {{post['lastEditTime']}}
                p.post-content {{post['excerpt'] | md2Text}}
</template>

<script>
    import { mapGetters,mapActions} from 'vuex'
    export default {
        data(){
            return {}
        },
        methods: {
            ...mapActions([
                'focusOnPost'
            ]),
            focus(index){
                if(!this.postSaved || !this.postTitleSaved){
                    this.$message({
                        type:"warning",
                        message:"还没保存完，过一会再点"
                    })
                    return false
                }
                if (index !== this.currentPostIndex){
                    this.focusOnPost(index)
                }
            }
        },
        computed: {
            ...mapGetters([
                'postList',
                'currentPostId',
                'currentPostIndex',
                'postSaved',
                'postTitleSaved'
                ]
            )
        },
        created(){
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
                .post-title a
                    color $green
            &:hover
                .post-title a
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