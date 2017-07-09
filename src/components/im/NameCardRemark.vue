<template>
  <div class="g-inherit m-article">
    <Row class="b-b-1">
      <Col span="24">
      <div class="fz-20 w-100 h60">
        <span class="fl m-l-10" @click="onClickBack">back</span>
        <span class="fr m-r-10">备注名</span>
      </div>
      </Col>
    </Row>
    <div class="fz-20 m-10">
      <span>备注:</span>
      <Input :required="false" :max="16"
             v-model="alias" placeholder="请输入备注名..." style="width: 300px"></Input>
    </div>
    <div>
      <Button type="primary" @click.native="setAlias">设置备注名</Button>
    </div>
  </div>
</template>

<script>
  import util from './utils'

  export default {
    /*eslint-disable*/

    data () {
      return {
        alias: ''
      }
    },
    computed: {
      account () {
        return this.$route.params.userId
      },
      userInfo () {
        let info = this.$store.state.userInfos[this.account] || {}
        this.alias = util.getFriendAlias(info)
        return info
      }
    },
    methods: {
      onClickBack: function () {
        // location.href = `#/chat/${this.sessionId}`
        window.history.go(-1)
      },

    }
  }
</script>
