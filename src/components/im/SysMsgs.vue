<template>
  <div class="g-inherit m-article" style="overflow-y: scroll">
    <Row class="b-b-1">
      <Col span="8">
      <span class="h60 m-l-10"> </span>
      </Col>
      <Col span="8">
      <Menu mode="horizontal" theme="light" active-name="1">
        <Menu-item name="1" class="tc" @click.native="changelog(0)">
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
      <div class="u-list" v-if="sysType===0">
        <Card style="width: 300px;float: left;margin:20px 20px 0 15px"
              class="u-list-item"
              v-for="msg in sysMsgs"
              key="msg.idServer">
          <p slot="title">系统信息</p>
          <p>
            <img class="icon" slot="icon" width="24" :src="msg.avatar">
          </p>
          <p> {{msg.showText}}
            <span>{{msg.showTime}}</span>
          </p>
          <div v-show="agreeBox">
            <p v-show="msg.agree" style="float: right">
              <a @click="acceptTeamInvite(msg.idServer,msg.from,msg.teamId)">同意</a>
              <a @click="rejectTeamInvite(msg.idServer,msg.from,msg.teamId)">拒绝</a>
            </p>
          </div>
        </Card>
      </div>
      <div class="u-list" v-if="sysType===1">
        <p
          v-for="(msg, index) in customSysMsgs"
          class="u-list-item"
          :key="msg.idServer">
          <img class="icon" slot="icon" width="24" :src="msg.avatar">
        </p>
      </div>
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
        sysType: 0,// 系统消息 0, 自定义消息 1,
        sysMsgsData: '',
      }
    },
    watch: {
      $route(to, from) {
        console.log('watch', to, from)
      },
      sysMsgs(val) {
        console.log('watch-sysMsgs', val)
      },
    },
    computed: {
      userInfos () {
        return this.$store.state.userInfos
      },
      sysMsgs () {
        console.log('this.$store.state.sysMsgs', this.$store.state.sysMsgs)
        this.sysMsgsData = this.$store.state.sysMsgs
        let sysMsgs = this.$store.state.sysMsgs.filter(msg => {
          switch (msg.type) {
            case 'addFriend':
              msg.showText = `${msg.friend.alias || msg.friend.account} 添加您为好友~`
              msg.avatar = this.userInfos[msg.from].avatar
              msg.agree = false
              return true
            case 'deleteFriend':
              msg.showText = `${msg.from} 将您从好友中删除`
              msg.avatar = this.userInfos[msg.from].avatar
              msg.agree = false
              return false
            case 'teamInvite':
              msg.showText = `${msg.from } 邀请你入群~`
              msg.avatar = msg.attach.team.avatar
              msg.teamId = msg.attach.team.teamId
              msg.agree = true
              return true
          }
          return false
        })
        return sysMsgs
      },
      customSysMsgs () {
        console.log('this.$store.state.customSysMsgs', this.$store.state.customSysMsgs)
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
    }
    ,
    methods: {
      changelog(val){
        this.sysType = val
        console.log(this.sysType)
        console.log('this.$store.state.sysMsgs', this.$store.state.sysMsgs)
        this.sysMsgsData = this.$store.state.sysMsgs

      },
      clearMsgs(){
        this.$store.dispatch('resetSysMsgs', {
          type: this.sysType
        })
      },
      acceptTeamInvite(idServer, from, teamId){
        const obj={
          idServer:idServer,
          from:from,
          teamId:teamId
        }
        console.log(obj)
        this.$store.dispatch('acceptTeamInvite', obj)
      },
      rejectTeamInvite(idServer, from, teamId){
        const obj={
          idServer:idServer,
          from:from,
          teamId:teamId
        }
        console.log(obj)
        this.$store.dispatch('rejectTeamInvite', obj)
      },
    }
    ,
    created()
    {
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
