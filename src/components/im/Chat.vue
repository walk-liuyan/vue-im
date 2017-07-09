<template>
  <div class="g-inherit m-article">
    <Row class="b-b-1">
      <Col span="24">
      <div class="w-100 " style="height: 55px">
        <span class="fl m-l-10 h60" @click="enterNameCard">{{sessionName}}</span>
        <span class="fr m-r-10 h60" @click="enterHistory">历史消息</span>
      </div>
      </Col>
    </Row>
    <div class="m-chat-main" id="m-chat-main">
      <chat-list
        type="session"
        :msglist="msglist"
        :userInfos="userInfos"
        :myInfo="myInfo"
        @msgs-loaded="msgsLoaded"
      ></chat-list>
    </div>
    <chat-editor
      style="position: absolute;bottom: 0px"
      type="session"
      :scene="scene"
      :to="to"
    ></chat-editor>
  </div>
</template>

<script>
  import ChatEditor from './components/ChatEditor'
  import ChatList from './components/ChatList'
  import util from './utils'
  import pageUtil from './utils/page'


  export default {
    /*eslint-disable*/
    components: {
      ChatEditor,
      ChatList
    },
    data () {
      return {
        /* 监听页面的高度*/
        /*
         screenHeight: document.body.clientHeight,
         */
        leftBtnOptions: {
          backText: ' ',
          preventGoBack: true,
        }
      }
    },
    watch: {
      $route(to, from) {
        console.log('watch', to, from)
      },
      sessionId(val) {
        console.log('sessionId:', val)
        this.$store.dispatch('setCurrSession', val)
      },
    },
    // 进入该页面，文档被挂载
    mounted () {
      this.$store.dispatch('showLoading')
      // 此时设置当前会话
      this.$store.dispatch('setCurrSession', this.sessionId)
      pageUtil.scrollChatListDown()
      setTimeout(() => {
        this.$store.dispatch('hideLoading')
      }, 1000)
    },
    updated () {
      pageUtil.scrollChatListDown()
    },
    // 离开该页面，此时重置当前会话
    destroyed () {
      this.$store.dispatch('resetCurrSession')
    },
    computed: {
      sessionId () {
        let sessionId = this.$route.params.sessionId
        return sessionId
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
      scene () {
        return util.parseSession(this.sessionId).scene
      },
      to () {
        return util.parseSession(this.sessionId).to
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
      }
    },
    methods: {
      enterHistory () {
        this.$router.push({
          path: `/im_web/chatHistory/${this.sessionId}`
        })
      },
      onClickBack () {
        // location.href = '#/contacts'
        window.history.go(-1)
      },
      msgsLoaded () {
        pageUtil.scrollChatListDown()
      },
      enterNameCard () {
        if (/^p2p-/.test(this.sessionId)) {
          let account = this.sessionId.replace(/^p2p-/, '')
          if (account === this.$store.state.userUID) {
            this.$router.push({
              path: `/im_web/general`
            })
            return
          }
          this.$router.push({path: `/im_web/namecard/${account}`})
        }
      }
    }
  }
</script>

<style type="scss">
  .b-b-1 {
    border-bottom: 1px solid #F0F0F0;
  }

  a {
    color: black;
    text-decoration: none;
  }

  .tl {
    text-align: left;
  }

  .tc {
    text-align: center;
  }

  .tr {
    text-align: right;
  }

  .m-chat-main {
    /* 聊天页面有输入框 */
    padding: 0 0 $height_editor 0;
    /* 聊天历史记录没有输入框 */
    &.m-chat-history {
      padding-bottom: 0;
    }
    .m-chat-list {
      position: relative;
      display: block;
      box-sizing: border-box;
      padding: 1rem 2%;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  .m-chat-main {
    overflow: hidden;
  }
</style>
