<template lang="pug">
    .login(@keyup.enter="login")
        .top
            img.logo(:src="logo")
            span Ant Design
        h4.desc Ant Design 是西湖区最具影响力的 Web 设计规范
        .body
            Input(v-model="username" ,:clearIcon="true" ,:autoFocus="true" ,placeholder="输入账号",icon="user")
            Input(v-model="password" type="password" ,:clearIcon="true" ,placeholder="输入密码",icon="key")
            Button(text="登 录" ,type="normal" ,:handler="login")
</template>

<script>
    import md5 from 'md5'
    import logo from '../assets/img/logo.svg'
    export default {
        data(){
            return {
                username:"",
                password:"",
                logo
            }
        },
        created(){
          //console.log(this)
        },
        methods:{
            login(){
                this.$http.post('/api/tokens',{
                    username:this.username,
                    password:md5(this.password).toUpperCase()
                }).then(resp => {
                    if(resp.status === 200){
                        this.$message({
                            message:"登录成功",
                            type:"success"
                        })
                        //保存session到本地sessionStorage
                        this.$freshSession(resp.data.data.token)
                        if (this.$route.query.redirect) {
                            this.$router.push(this.$route.query.redirect)
                        } else {
                            this.$router.push('/posts')
                        }
                    }
                }).catch(e => {
                    console.log(e)
                    if(e.response){
                        this.$message({
                            type:'error',
                            message:e.response.data.message
                        })
                    } else {
                        this.$message({
                            type:'error',
                            message:e || "未知错误"
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .login
        display flex
        flex-direction column
        //justify-content center
        align-items center
        padding 112px 0 24px
        box-sizing border-box
        width 100%
        height 100%
        background-image url('../assets/img/loginBG.svg')
        background-repeat no-repeat
        background-size 100%
        background-color #f0f2f5
        .top
            display flex
            line-height w=44px
            cursor default
            .logo
                width w
                height w
                margin-right 16px
            span
                font-size 33px
                font-weight 600
                font-family Myriad Pro,Helvetica Neue,Arial,Helvetica,sans-serif
                color rgba(0,0,0,0.85)
        .desc
            color rgba(0,0,0,0.45)
            margin-top 12px
            margin-bottom 40px
            font-size 14px
        .body
            display flex
            flex-direction column
            width 368px
            &>*
                margin-bottom 24px
</style>