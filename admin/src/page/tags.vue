<template lang="pug">
    .tags-wrapper
        nav-side
        section.post-list-wrapper
            h3.page-title
                i.fa.fa-file-text-o
                |  标签列表
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
    }
</script>

<style lang="stylus" scoped>
    .tags-wrapper
        height 100%
        display flex
</style>