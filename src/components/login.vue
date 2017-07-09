<template>
  <div id="form-data">

    <Row class="tc">
      <Col span="8" offset="8">
      <Input v-model="account" placeholder="请输入用户名..." class="h30" style="width: 300px"></Input>
      </Col>
    </Row>
    <div class="m-b-20"></div>
    <Row class="tc">
      <Col span="8" offset="8">
      <Input type="password" v-model="password" placeholder="请输入密码..." style="width: 300px"></Input></Col>
    </Row>
    <div class="m-20"></div>
    <Row class="tc">
      <Col span="8" offset="8">
      <Button type="info" class="m-r-20" @click.native="regist">注册</Button>
      <Button type="info" class="m-l-20" @click.native="login">登录</Button>
      </Col>
    </Row>

  </div>
</template>
<script type="text/babel">
  import md5 from '../components/im/utils/md5'
  import cookie from '../components/im/utils/cookie'
  import config from '../components/im/configs'

  export default{
    data() {
      return {
        logo: config.logo,
        account: '',
        password: '',
        errorMsg: '',
      }
    },
    mounted() {
      this.$el.style.display = ''
    },
    methods: {
      login() {
        if (this.account === '') {
          this.errorMsg = '帐号不能为空'
          return
        } else if (this.password === '') {
          this.errorMsg = '密码不能为空'
          return
        } else if (this.password.length < 6) {
          this.errorMsg = '密码至少需要6位'
          return
        }
        this.errorMsg = ''
        // 本demo做一次假登录
        // 真实场景应在此向服务器发起ajax请求
        const sdktoken = md5(this.password)
        cookie.setCookie('uid', this.account)
        cookie.setCookie('sdktoken', sdktoken)
        location.href = config.homeUrl
        console.log('connect', this.$store.dispatch('connect'))
      },
      regist() {
        this.$router.push({
          path: '/regist',
        })
      },
    },
  }
</script>
