<template>
  <div class="g-inherit m-article">
    <Row class="b-b-1">
      <Col span="8">
      <span class="h60 m-l-10"> </span>
      </Col>
      <Col span="8">
      <Menu mode="horizontal" theme="light" active-name="1">
        <Menu-item name="1" class="tc" @click.native="changelog(2)">
          <Icon type="ios-paper"></Icon>
          系 统 消 息
        </Menu-item>
        <Menu-item name="2" class="tc"
                   @click.native="changelog(1)">
          <Icon type="ios-people"></Icon>
          自 定 义 消 息
        </Menu-item>
      </Menu>
      </Col>
      <Col span="8">
      <span class="h60 fr m-r-10" @click.stop="clearMsgs">清空</span>
      </Col>
    </Row>

    <div class="m-article-main p-sysmsgs">
      <Card v-for="msg in sysMsgs"
            :key="msg.idServer">
        <p slot="title">{{msg.showText}}</p>
        <p>{{msg.showTime}}</p>
        <p><img class="icon" slot="icon" width="24" :src="msg.avatar"></p>
        <p>卡片内容</p>
      </Card>

      <Card
        v-if="sysType===1"
        v-for="(msg, index) in customSysMsgs"
        :key="msg.idServer">
        <p slot="title">{{msg.showText}}</p>
        <p>{{msg.showTime}}</p>
        <p><img class="icon" slot="icon" width="24" :src="msg.avatar"></p>
        <p>卡片内容</p>
      </Card>

    </div>
  </div>
</template>

<script>

  export default {
    /*eslint-disable*/

    // 进入该页面，文档被挂载
    mounted () {
      this.$store.dispatch('markSysMsgRead')
      this.$store.dispatch('markCustomSysMsgRead')
    },
    updated () {
      this.$store.dispatch('markSysMsgRead')
      this.$store.dispatch('markCustomSysMsgRead')
    },
    data () {
      return {
        sysType: 0 // 系统消息 0, 自定义消息 1,
      }
    },
    computed: {
      userInfos () {
        return this.$store.state.userInfos
      },
      sysMsgs () {
        let sysMsgs = this.$store.state.sysMsgs.filter(msg => {
          switch (msg.type) {
            case 'addFriend':
              msg.showText = `${msg.friend.alias || msg.friend.account} 添加您为好友~`
              msg.avatar = this.userInfos[msg.from].avatar
              return true
            case 'deleteFriend':
              msg.showText = `${msg.from} 将您从好友中删除`
              msg.avatar = this.userInfos[msg.from].avatar
              return false
          }
          return false
        })
        return sysMsgs
      },
      customSysMsgs () {
        let customSysMsgs = this.$store.state.customSysMsgs.filter(msg => {
          if (msg.scene === 'p2p') {
            let content = JSON.parse(msg.content)
            msg.showText = `${content.content}`
            msg.avatar = this.userInfos[msg.from].avatar
            return msg
          }
          return false
        })
        return customSysMsgs
      }
    },
    methods: {
      changelog(val){
        this.sysType = val
        console.log(this.sysType)
      },
      clearMsgs () {
        this.$store.dispatch('resetSysMsgs', {
          type: this.sysType
        })
      }
    }
  }
</script>

<style type="text/css">
  .p-sysmsgs {

  .u-list {
    height: 100%;
    overflow-y: scroll;
  }

  p {
    word-wrap: normal;
    word-break: break-all;
    color: #333;
  }

  }
</style>
