<template lang="pug">
    .tags-wrapper this is tag
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