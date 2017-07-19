<template>
  <div class="g-inherit m-article p-namecard">
    <Row class="b-b-1">
      <Col span="24">
      <div class="fz-20 w-100 h60">
        <span class="fl m-l-10" @click="onClickBack">
          <Icon type="ios-arrow-back"></Icon>
        </span>
        <span class="fr m-r-10">{{userInfo.alias || userInfo.nick}}</span>
      </div>
      </Col>
    </Row>
    <div class="m-list">
      <Card class="m-t-20" style="width: 420px;margin: auto">
        <img class="icon" slot="icon" width="20" :src="userInfo.avatar">
        <p class="fz-18 m-10">昵称：{{userInfo.nick}}</p>
        <p class="fz-18 m-10">生日：{{userInfo.birth}}</p>
        <p class="fz-18 m-10">手机：{{userInfo.tel}}</p>
        <p class="fz-18 m-10">邮箱：{{userInfo.email}}</p>
        <p class="fz-18 m-10">签名：{{userInfo.sign}}</p>
        <p class="fz-18 m-10"> 备注：<Input :required="false" :max="16" v-model="alias" placeholder="请输入备注名..."
                                         style="width: 300px" @keyup.enter.native="setAlias"></Input></p>
        <p class="fz-18 m-10">黑名单:
          <i-switch class="u-switch" v-model="isBlack" @on-change="changeBlack"></i-switch>
        </p>
      </Card>
      <Modal
        v-model="modal1"
        title="提示框"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>删除好友后，将同时解除双方的好友关系</p>
      </Modal>
      <div class="tc w-100 m-10">
        <!-- <Button v-show="isFriend" type="info" @click.native="enterRemarkLink">备注名</Button>-->
        <Button type="info" @click.native="enterChat">聊天</Button>
        <Button type="info" @click.native="enterHistory" v-show="isFriend">历史记录</Button>
        <Button v-show="isFriend" type="info" @click.native="deleteFriend">删除好友</Button>
        <Button type="info" v-show="!isFriend" @click.native="addFriend">添加好友</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import util from './utils'

  export default {
    /*eslint-disable*/

    data () {
      return {
        alias: '',
        isBlack: false,
        modal1: false,
      }
    },
    computed: {
      account () {
        return this.$route.params.userId
      },
      userInfo () {
        let info = this.$store.state.userInfos[this.account] || {}
        /*
         info.alias = util.getFriendAlias(info)
         */
        this.alias = util.getFriendAlias(info)
        this.isBlack = info.isBlack
        return info
      },
      /*
       * account () {
       return this.$route.params.userId
       },
       userInfo () {
       let info = this.$store.state.userInfos[this.account] || {}
       this.alias = util.getFriendAlias(info)
       return info
       }*/


      // 是否是联系人，黑名单和好友都算
      isFriend () {
        let userInfo = this.userInfo
        return userInfo.isFriend
      },

    },
    methods: {
      setAlias () {
        this.alias = this.alias.replace(/\n/g, ' ').replace(/\r/g, '')
        if (/^\s*$/.test(this.alias)) {
          // ...
        } else if (this.alias.length > 16) {
          this.$Message.warning('备注不能超过16个字符');
          return
        }
        this.$store.dispatch('updateFriend', {
          account: this.account,
          alias: this.alias
        })
      },
      enterRemarkLink () {
        this.$router.push({path: `/im_web/namecardremark/${this.account}`})
      },
      onClickBack: function () {
        // location.href = `#/chat/${this.sessionId}`
        window.history.go(-1)
      },
      changeBlack () {
        this.$store.dispatch('updateBlack', {
          account: this.account,
          isBlack: this.isBlack
        })
      },
      enterChat () {
        this.$router.push({path: `/im_web/chat/p2p-${this.account}`})
        /*
         location.href = `#/chat/p2p-${this.account}`
         */
      },
      enterHistory () {
        this.$router.push({path: `/im_web/chathistory/p2p-${this.account}`})
        /*
         location.href = `/im_web/chatHistory/p2p-${this.account}`
         */
      },
      addFriend () {
        this.$store.dispatch('addFriend', this.account)
      },
      deleteFriend () {
        this.modal1 = true
      },
      ok () {
        this.$Message.info('删除成功！');
        let that = this
        that.$store.dispatch('deleteFriend', that.account)
      },
      cancel () {
        this.$Message.info('点击了取消');
      }
    }
  }
</script>

<style type="scss">
  .p-namecard {
    .m-list {
      padding-top: 3.6rem;
    }
    .u-bottom {
      margin-bottom: 2rem;
    }
  }

</style>
