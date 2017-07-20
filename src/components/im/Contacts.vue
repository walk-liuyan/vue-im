<template>
  <div style="height: 640px;overflow-y: scroll;">
    <Row>
      <Col>
      <div v-show="modal">
        <Modal
          :width="980"
          v-model="modal"
          title="普通的Modal对话框标题"
          @on-ok="ok"
          @on-cancel="cancel">
          <Input v-model="teamName" placeholder="请输入..." style="width: 300px"></Input>
          <Transfer
            :titles="TransferTitles"
            :data="initData"
            :target-keys="targetKeys"
            :render-format="render"
            :list-style="listStyle"
            filterable
            :filter-method="filterMethod"
            @on-change="handleChange">
          </Transfer>
        </Modal>
      </div>

      <Menu theme="light" active-name="1" width="100%">
        <div>
          <Button @click="createNormalTeam">创建讨论组</Button>
          <Button @click="createAdvancedTeam">创建高级群</Button>
        </div>
        <Menu-group title="讨论组">
          <Menu-item v-for="(team,index) in normalList"
                     :key="team.teamId"
                     name="index"
                     @click.native="enterChat(team.link)">
            <div>
              <img class="icon" slot="icon" width="20" :src="team.avatar">
              <span>{{team.name}}</span>
            </div>
          </Menu-item>
        </Menu-group>
        <Menu-group title="高级群">
          <Menu-item v-for="(team,index) in advancedList"
                     :key="team.teamId"
                     name="index"
                     @click.native="enterChat(team.link)">
            <div>
              <img class="icon" slot="icon" width="20" :src="team.avatar">
              <span>{{team.name}}</span>
            </div>
          </Menu-item>
        </Menu-group>
        <Menu-group title="好友列表">
          <Menu-item v-for="(friend,index) in friendslist" :key="friend.account"
                     name="index"
                     @click.native="enterChat(friend.link)">
            <div>
              <img class="icon" slot="icon" width="20" :src="userInfos[friend.account].avatar">
              <span>{{friend.alias}}</span>
            </div>
          </Menu-item>
        </Menu-group>
        <Menu-group title="黑名单">
          <Menu-item v-for="(friend,index) in blacklist" :key="friend.account"
                     name="index"
                     @click.native="enterChat(friend.link)">
            <div>
              <img class="icon" slot="icon" width="20" :src="userInfos[friend.account].avatar">
              <span>{{friend.alias}}</span>
            </div>
          </Menu-item>
        </Menu-group>
      </Menu>
      </Col>
    </Row>
  </div>
</template>

<script>

  export default {
    /*eslint-disable*/
    data(){
      return {
        advancedList: [],
        normalList: [],
        modal: false,
        initData: '',
        targetKeys: this.getTargetKeys(),
        friendslistArr: [],
        listStyle: {
          width: '250px',
          height: '300px'
        },
        TransferTitles: ['初始好友', '新添好友'],
        createType: '',
        teamName: '',
      }
    },
    watch: {
      $route(to, from) {
        console.log('watch', to, from)
      },
      teamlist(val) {
        console.log('watch-teamlist', val)
      },
      friendslist(val) {
        console.log('watch-friendslist', val)
      },
    },
    computed: {
      teamlist () {
        console.log('computed', this.$store.state.teamlist)
        return this.$store.state.teamlist.filter((item) => {
          item.link = `/im_web/chat/team-${item.teamId}`
          if (item.type === 'advanced') {
            item.avatar = '../../../static/res/im/advanced.png'
            this.advancedList.push(item)
          } else {
            item.avatar = '../../../static/res/im/normal.png'
            this.normalList.push(item)
          }
          return true
        })
      },
      friendslist(){
        return this.$store.state.friendslist.filter(item => {
          let account = item.account
          let thisAttrs = this.userInfos[account]
          console.log('thisAttrs', thisAttrs)
          let alias = thisAttrs.alias ? thisAttrs.alias.trim() : ''
          item.alias = alias || thisAttrs.nick || account
          item.link = `/im_web/namecard/${item.account}`
          if ((!thisAttrs.isFriend) || (thisAttrs.isBlack)) {
            return false
          }
          return true
        })
      },
      blacklist(){
        return this.$store.state.blacklist.filter(item => {
          let account = item.account
          let thisAttrs = this.userInfos[account]
          let alias = thisAttrs.alias ? thisAttrs.alias.trim() : ''
          item.alias = alias || thisAttrs.nick || account
          item.link = `/im_web/namecard/${item.account}`
          if (!thisAttrs.isFriend) {
            return false
          }
          return true
        })
      },
      userInfos(){
        return this.$store.state.userInfos
      },
      createTeam(){
        return this.$store.state.createTeam
      },
    },
    methods: {
      enterChat(path) {
        console.log(path)
        this.$router.push({path: `${path}`})
      },
      /*getMockData () {
        const friendslistData = this.$store.state.friendslist
        console.log('getMockData=>friendslistData', friendslistData)
        let mockData = [];
        _(friendslistData).forEach((item) => {
          mockData.push({
            key: item.account,
            label: item.alias,
          })
        })
         return mockData;
      },*/
      getTargetKeys () {
        const initData =this.initData
        return _.map(initData,item => item.key)
      },
      render (item) {
        return item.label + ' - ' + item.key;
      },
      handleChange (newTargetKeys, direction, moveKeys) {
        console.log('newTargetKeys', newTargetKeys);
        console.log('direction', direction);
        console.log('moveKeys', moveKeys);
        this.targetKeys = newTargetKeys;
        console.log('this.targetKeys', this.targetKeys)
      },
      filterMethod (data, query) {
        return data.label.indexOf(query) > -1;
      },
      ok () {
        console.log(this.createType)
        if (this.createType === 'Normal') {
          const obj = {
            accounts: this.targetKeys,
            teamName: this.teamName
          }
          console.log('this.teamName', this.teamName)
          this.$store.dispatch('createNormalTeam', obj)
          /*
           需要实现跳转到当前创建的群
           */
        } else if (this.createType === 'Advanced') {
          console.log('this.teamName', this.teamName)
          const obj = {
            accounts: this.targetKeys,
            teamName: this.teamName
          }
          this.$store.dispatch('createAdvancedTeam', obj)
        } else {
          this.$Message.info('has a error');
        }
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      createNormalTeam(){
        this.modal = true
        console.log('this.targetKeys', this.targetKeys)
        this.createType = 'Normal'
        console.log(this.createType)
      },
      createAdvancedTeam(){
        this.modal = true
        console.log('this.targetKeys', this.targetKeys)
        this.createType = 'Advanced'
        console.log(this.createType)
      },
    },
    created(){
      const friendslistData = this.$store.state.friendslist
      console.log('getMockData=>friendslistData', friendslistData)
      let mockData = [];
      _(friendslistData).forEach((item) => {
        mockData.push({
          key: item.account,
          label: item.alias,
        })
      })
      this.initData = mockData
    }
  }

</script>

<style type="scss">
  .p-contacts {

    .add-friend {
      background-color: #fff;
    }

    .m-list {
      padding-top: 8rem;
    }

    .u-search-box-wrap {
      text-align: center;
    }

    .u-search-box {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      min-width: 45%;
      padding: 1em;
      height: 3rem;
      text-align: center;
      border: 1px solid #ccc;
      background-color: #fff;
      font-size: 0.8rem;
      box-shadow: 2px 2px 6px #ccc;

      a {
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
      }

    }
    .u-card {

      .icon {
        display: inline-block;
        margin-right: 0.4rem;
        width: 1.4rem;
        height: 1.4rem;
        background-size: 20rem;
      }

      .icon-team-advanced {
        background-position: 0 -3rem;
        background-image: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);
      }

      .icon-team {
        background-position: -2.1rem -3rem;
        background-image: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);
      }

    }
  }
</style>
