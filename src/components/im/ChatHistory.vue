<template>
  <div class="g-inherit m-article p-chat-history">
    <Row class="b-b-1">
      <Col span="24">
      <div class="fz-20 w-100 h60">
        <span class="fl m-l-10" @click="onClickBack">
          <Icon class="fz-20" type="ios-arrow-back"></Icon>
        </span>
        <span class="fr m-r-10">{{sessionName}}</span>
      </div>
      </Col>
    </Row>
      <div class="m-chat-main" style="height: 700px">
        <chat-list
          ref="chatlist"
          type="session"
          :canLoadMore="canLoadMore"
          :msglist="msglist"
          :userInfos="userInfos"
          :myInfo="myInfo"
        ></chat-list>
      </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import ChatList from './components/ChatList'
  import util from './utils'
  import pageUtil from './utils/page'

  export default {
  /*  beforeMount () {
      if (this.$store.state.isRefresh) {
        location.href = `/im_web/chat/${this.sessionId}`
      }
    },*/
    mounted () {
      this.$store.dispatch('resetNoMoreHistoryMsgs')
      this.getHistoryMsgs()
    },
    updated () {
      let tempPagePos = pageUtil.getChatListHeight()
      pageUtil.scrollChatListDown(tempPagePos - this.currPagePos)
      this.currPagePos = tempPagePos
    },
    components: {
      ChatList
    },
    data () {
      return {
        leftBtnOptions: {
          backText: ' ',
          preventGoBack: true,
        },
        currPagePos: 0,
        // selectedDate: ''
      }
    },
    computed: {
      sessionId () {
        return this.$route.params.sessionId
      },
      sessionName () {
        let sessionId = this.sessionId
        let user = null
        if (/^p2p-/.test(sessionId)) {
          user = sessionId.replace(/^p2p-/, '')
          if (user === this.$store.state.userUID) {
            return '我的手机'
          }
          let userInfo = this.userInfos[user] || {}
          return util.getFriendAlias(userInfo)
        } else if (/^team-/.test(sessionId)) {
          return '群'
        }
      },
      myInfo () {
        return this.$store.state.myInfo
      },
      userInfos () {
        return this.$store.state.userInfos
      },
      msglist () {
        let msgs = this.$store.state.currSessionMsgs
        return msgs
      },
      scene () {
        return util.parseSession(this.sessionId).scene
      },
      to () {
        return util.parseSession(this.sessionId).to
      },
      canLoadMore () {
        return !this.$store.state.noMoreHistoryMsgs
      }
    },
    methods: {
      getHistoryMsgs () {
        if (this.canLoadMore) {
          this.$store.dispatch('getHistoryMsgs', {
            scene: this.scene,
            to: this.to
          })
        }
      },
      loadMore () {
        if (pageUtil.getChatListScroll() <= 5) {
          this.getHistoryMsgs()
        }
      },
      onClickBack: function () {
        // location.href = `#/chat/${this.sessionId}`
        window.history.go(-1)
      }
    }
  }
</script>

<style type="scss">
  .p-chat-history {

  .m-chat-main {
    padding: 0;
  }

  }
</style>
