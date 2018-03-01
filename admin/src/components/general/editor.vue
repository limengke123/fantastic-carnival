<template lang="pug">
    .editor
        textarea(style="opacity:0" )
</template>

<script>
    import SimpleMDE from 'simplemde'
    import marked from 'marked'
    export default {
        data(){
            return {
                simpleMDE:null
            }
        },
        props:{
            value:{
                type:String,
                'default':''
            }
        },
        mounted(){
            console.log(this.$el)
            this.simpleMDE = new SimpleMDE({
                initialValue:this.value,
                autoDownloadFontAwesome:false,
                element:this.$el.children[0],
                previewRender: function (plainText) {
                    return marked(plainText) // Returns HTML from a custom parser
                },
                spellChecker:false
            })
            this.simpleMDE.codemirror.on('change', () => {
                let value = this.simpleMDE.value()
                if (this.value === value) {
                    return
                }
                this.$emit('input', value)
            })
        },
        destroyed(){
            this.simpleMDE = null
        },
        watch: {
            value (val) {
                if (val !== this.smde.value()) {
                    this.smde.value(val)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>