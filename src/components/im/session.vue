<template>
  <div>
    <Row>
      <Col>
      <Menu theme="light" active-name="1" width="100%">
        <Menu-item @click.native="enterMyChat" name="1">
          <div><img class="icon" slot="icon" width="24" :src="myPhoneIcon">
            我的手机
          </div>
        </Menu-item>
        <Menu-item name="2" @click.native="enterSysMsgs">
          <div><img class="icon" slot="icon" width="24" :src="noticeIcon">消息中心<span v-show="sysMsgUnread > 0" class="u-unread">{{sysMsgUnread}}</span>
          </div>
        </Menu-item>
        <Menu-group title="最近聊天">
          <Menu-item v-for="(session,index) in sessionlist"
                     :key="session.id"
                     @click.native="enterChat(session)"
                     name="index">
            <div>
              <img class="icon" slot="icon" width="24" :src="session.avatar">
              <span>{{session.name}}-{{session.lastMsgShow}}</span>
              <span v-show="session.unread > 0" class="u-unread">{{session.unread}}</span>
            <!-- <span
                class="u-tag-del"
                :class="{active: delSessionId===session.id}"
                @click="deleteSession"
              >
              </span>-->
            </div>
          </Menu-item>
        </Menu-group>
      </Menu>
      </Col>
    </Row>
  </div>
</template>
<script>
  /*eslint-disable*/
  import util from './utils/index'
  import config from './configs/index'

  export default {
    data() {
      return {
        delSessionId: null,
        stopBubble: false,
        noticeIcon: config.noticeIcon,
        myPhoneIcon: config.myPhoneIcon
      }
    },
    computed: {
      sysMsgUnread () {
        let temp = this.$store.state.sysMsgUnread
        let sysMsgUnread = temp.addFriend || 0
        let customSysMsgUnread = this.$store.state.customSysMsgUnread
        return sysMsgUnread + customSysMsgUnread
      },
      userInfos () {
        return this.$store.state.userInfos
      },
      myInfo () {
        return this.$store.state.myInfo
      },
      myPhoneId () {
        return `${this.$store.state.userUID}`
      },
      sessionlist () {
        let sessionlist = this.$store.state.sessionlist.filter(item => {
          item.name = ''
          item.avatar = ''
          if (item.scene === 'p2p') {
            let userInfo = null
            if (item.to !== this.myPhoneId) {
              userInfo = this.userInfos[item.to]
            } else {
              // userInfo = this.myInfo
              // userInfo.alias = '我的手机'
              // userInfo.avatar = `${config.myPhoneIcon}`
              return false
            }
            if (userInfo) {
              item.name = util.getFriendAlias(userInfo)
              item.avatar = userInfo.avatar
            }
          }
          let lastMsg = item.lastMsg || {}
          if (lastMsg.type === 'text') {
            item.lastMsgShow = lastMsg.text || ''
          } else if (lastMsg.type === 'custom') {
            item.lastMsgShow = util.parseCustomMsg(lastMsg)
          } else if (util.mapMsgType(lastMsg)) {
            item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
          } else {
            item.lastMsgShow = ''
          }
          if (item.updateTime) {
            item.updateTimeShow = util.formatDate(item.updateTime, true)
          }
          return item
        })
        return sessionlist
      }
    },
    methods: {
      enterSysMsgs () {
        if (this.hideDelBtn())
          return
        this.$router.push({path: '/im_web/sysmsgs'})

      },
      enterChat (session) {
        if (this.hideDelBtn())
          return
        if (session && session.id)
          this.$router.push({path: `/im_web/chat/${session.id}`})
      },
      enterMyChat () {
        // 我的手机页面
        this.$router.push({path: `/im_web/chat/p2p-${this.myPhoneId}`})
      },
      deleteSession () {
        if (this.delSessionId !== null) {
          this.$store.dispatch('deleteSession', this.delSessionId)
        }
      },
      showDelBtn (vNode) {
        if (vNode && vNode.data && vNode.data.attrs) {
          this.delSessionId = vNode.data.attrs.sessionId
          this.stopBubble = true
          setTimeout(() => {
            this.stopBubble = false
          }, 20)
        }
      },
      hideDelBtn () {
        if (this.delSessionId !== null && !this.stopBubble) {
          // 用于判断是否前置状态是显示删除按钮
          this.delSessionId = null
          return true
        }
        return false
      }
    }
  }
</script>
<style>
  ul img {
    position: relative;
    top: 5px;
    margin-right: 10px;
  }

</style>
