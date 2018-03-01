<template lang="pug">
    aside.sidebar
        img.sidebar-logo(src="../assets/img/logo.png")
        nav.aside-nav
            ul.aside-nav-list
                li.aside-nav-item(title="文章"): router-link.aside-nav-button(to="/posts"): i.fa.fa-file-text-o
                li.aside-nav-item(title="标签"): router-link.aside-nav-button(to="/tags"): i.fa.fa-tags
        nav.aside-menu: .aside-nav-item(title="退出"): a.aside-nav-button(@click="deleteToken"): i.fa.fa-arrow-left
</template>

<script>
    export default {
        methods:{
            deleteToken(){
               this.$router.push('/')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../styl/list.styl'
    @import '../styl/variable.styl'
    .sidebar
        box-sizing border-box
        position relative
        display flex
        flex-direction column
        align-items center
        height 100%
        width 70px
        background-color #f8f8f8
        padding 12px 12px 24px 12px
        text-align center
        .sidebar-logo
            width 36px
            //height 36px
            margin-top 5px
        .aside-nav
            margin-top 30px
        .aside-nav-item
            padding 20px 0
        .aside-nav-button
            transition $transition
            box-sizing border-box
            display inline-block
            width w=45px
            height w
            background-color #fff
            color $green
            border-radius 50%
            padding 0
            padding-top 6px
            border 1px solid $border
            font-size 22px
            cursor pointer
            &.active
                border 1px solid $green
            &:hover
                color #fff
                background $green
                border 1px solid $green
        .aside-menu
            position absolute
            width 100%
            left 0
            bottom 0

</style>