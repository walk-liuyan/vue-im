<template>
  <div id="form-data">

    <Row class="tc">
      <Col span="8" offset="8">
      <Input v-model="account" placeholder="账号：限20位字母或者数字..." class="h30" style="width: 300px"></Input>
      </Col>
    </Row>
    <div class="m-b-20"></div>
    <Row class="tc">
      <Col span="8" offset="8">
      <Input v-model="password" placeholder="昵称：限10位汉字、字母或者数字..." style="width: 300px"></Input></Col>
    </Row>
    <div class="m-b-20"></div>
    <Row class="tc">
      <Col span="8" offset="8">
      <Input type="password" v-model="password" placeholder="密码：6-20位字母或数字
..." style="width: 300px"></Input></Col>
    </Row>
    <div class="m-20"></div>
    <Row class="tc">
      <Col span="8" offset="8">
      <Button type="info" class="m-r-20" @click.native="login">登录</Button>
      <Button type="info" class="m-l-20" @click.native="regist">注册</Button>
      </Col>
    </Row>

  </div>
</template>
<script type="text/babel">
  import md5 from '../components/im/utils/md5'
  import cookie from '../components/im/utils/cookie'
  import config from '../components/im/configs'
  import util from '../components/im/utils'

  export default{
    data() {
      return {
        logo: config.logo,
        account: '',
        password: '',
        nickname: '',
        errorMsg: '',
      }
    },
    mounted() {
      this.$el.style.display = ''
    },
    methods: {
      regist() {
        if (this.account === '') {
          this.errorMsg = '帐号不能为空'
          return
        } else if (this.account.length > 20) {
          this.errorMsg = '帐号最多限20位'
          return
        } else if (/[^a-zA-Z0-9]/.test(this.account)) {
          this.errorMsg = '帐号限字母或数字'
          return
        } else if (this.nickname.length > 10) {
          this.errorMsg = '昵称限10位中文、英文或数字'
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

        const xhr = new XMLHttpRequest()
        xhr.open('POST', `${config.postUrl}/api/createDemoUser`, true)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.setRequestHeader('appkey', config.appkey)
        xhr.send(util.object2query({
          username: this.account,
          password: sdktoken,
          nickname: this.nickname,
        }))
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText)
              if (data.res === 200) {
                cookie.setCookie('uid', this.account)
                cookie.setCookie('sdktoken', sdktoken)
                location.href = config.homeUrl
              } else if (data.res === 414) {
                this.errorMsg = data.errmsg
              } else {
                this.errorMsg = data.errmsg
              }
            } else {
              this.errorMsg = '网络断开或其他未知错误'
            }
            this.$forceUpdate()
          }
        }
      },
      login() {
        this.$router.push({
          path: '/login',
        })
      },
    },
  }
</script>
