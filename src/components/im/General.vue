<template>
  <div class="g-inherit m-main p-general" v-if="myInfo.account">
    <Row class="b-b-1">
      <Col span="24">
      <div class="fz-20 w-100 h60 tc">个人信息</div>
      </Col>
    </Row>
    <Card  class="m-t-20" style="width: 420px;margin: auto">
      <p slot="title" style="height: 50px" class="tc">
        <img class="icon" slot="icon" width="50" :src="myInfo.avatar">
      </p>
      <p class="fz-18 m-10">账号：{{ myInfo.account}}</p>
      <p class="fz-18 m-10">昵称：{{myInfo.nick || ''}}</p>
      <p class="fz-18 m-10">生日：{{myInfo.birth}}</p>
      <p class="fz-18 m-10">手机：{{myInfo.tel}}</p>
      <p class="fz-18 m-10">邮箱：{{myInfo.email}}</p>
      <p class="fz-18 m-10">签名：{{myInfo.sign}}</p>
    </Card>
    <div class="tc m-10">
      <Button type="warning" @click="modal1 = true">注销</Button>
    </div>
    <Modal
      v-model="modal1"
      title="message"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>确定要注销帐号?</p>
    </Modal>
  </div>
</template>

<script>
  export default {
    /*eslint-disable*/
    data() {
      return {
        modal1: false
      }
    },
    computed: {
      myInfo () {
        return this.$store.state.myInfo
      }
    },
    methods: {
      ok () {
        let that = this
        that.$store.dispatch('logout')
      },
      cancel () {
        this.modal1 = false
      }
    }
  }
</script>
