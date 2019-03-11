<template>
    <section>
        登录
    </section>
</template>

<script>
import Cookie from 'js-cookie'

export default {
    data(){
        return{
            redirectURL:'/'
        }
    },
    mounted() {
      let rediretUrl = this.$route.query.ref;
      if (rediretUrl){
        this.redirectURL = rediretUrl
      }
    },
    methods: {
        submitLogin(ev) {
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
            if (valid) {
                _this.logining = true
                var sendData = {
                username: _this.ruleForm2.account,
                password: _this.ruleForm2.pass,
                is_remember: _this.isRemember
                };
                //登录操作
                _this.$https.post('login/index', sendData).then(res => {
                if (res.status == 1) {
                    //将服务端的token存入cookie当中
                    Cookie.set('token', res.data.token)
                //返回上一页
                _this.$router.push(_this.redirectURL)
                }else{
                    _this.$message.warning(res.msg)
                }
                })
            } else {
                return false;
            }
            });
        },
    }
}
</script>