<template lang="pug">
    transition(name="el-message-fade")
        div(
        v-bind:class="classes"
        v-show="visible"
        v-on:mouseenter="clearTimer"
        v-on:mouseleave="startTimer"
        role="alert"
        )
            i(:class="iconClass" v-if="iconClass")
            i(:class="typeClass" v-else)
            p(class="el-message__content") {{message}}
            i(v-if="showClose" class="el-message__closeBtn el-icon-close" v-on:click="close")
</template>

<script>
    const typeMap = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        error: 'error'
    };
    export default {
        name: "Message",
        data(){
            return {
                visible: false,
                message: '',
                duration: 3000,
                type: 'warning',
                iconClass: '',
                timer: null,
                closed: false,
                onClose: null,
                center: false,
                showClose: false,
                customClass:''
            }
        },
        computed: {
            classes: function () {
                return [
                    'el-message',
                    this.type && !this.iconClass ? `el-message--${this.type}` : '',
                    this.center ? 'is-center' : '',
                    this.showClose ? 'is-closeable' : '',
                    this.customClass
                ]
            },
            iconWrapClass() {
                const classes = ['el-message__icon'];
                if (this.type && !this.iconClass) {
                    classes.push(`el-message__icon--${ this.type }`);
                }
                return classes;
            },

            typeClass() {
                return this.type && !this.iconClass
                    ? `el-message__icon el-icon-${ typeMap[this.type] }`
                    : '';
            }
        },
        watch: {
            closed: function (newVal) {
                if (newVal) {
                    this.visible = false
                    this.$el.addEventListener('transitionend', this.destroyElement)
                }
            }
        },
        methods: {
            destroyElement(){
                this.$el.removeEventListener('transitionend', this.destroyElement)
                this.$destroy(true)
                this.$el.parentNode.removeChild(this.$el)
            },
            close(){
                this.closed = true
                if (typeof this.onClose === 'function') {
                    this.onClose(this)
                }
            },
            startTimer(){
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close()
                        }
                    }, this.duration)
                }
            },
            clearTimer(){
                clearTimeout(this.timer)
            },
            keydown(e){
                if (e.keyCode === 27) {
                    if (!this.closed) {
                        this.close()
                    }
                }
            }
        },
        mounted(){
            this.startTimer()
            document.addEventListener('keydown', this.keydown)
        },
        beforeDestroy(){
            document.removeEventListener('keydown', this.keydown)
        }
    }
</script>

<style lang="stylus" scoped>
    @import './index.styl'
</style>