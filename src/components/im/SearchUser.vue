<template>
  <div class="g-inherit m-article p-search-user">
    <Row class="b-b-1">
      <Col span="24">
      <div class="fz-20 w-100 h60 tc">搜索结果</div>
      </Col>
    </Row>
    <Card style="width: 300px;margin: 20px"
          @click.native="enterCard(user.link)"
          :userId="index"
          :key="user.account"
          v-for="(user, index) in searchList">
      <p slot="title" class="tc" style="height: 70px">
        <img class="icon" slot="icon" width="60" :src="user.avatar"></p>
      <p>昵称：{{user.nick}}</p>
      <p>账户：{{user.account}}</p>
    </Card>
    <div class="u-card">
      <h3>{{errMsg}}</h3>
    </div>
  </div>
</template>

<script>
  import config from './configs'

  export default {
    /*eslint-disable*/
    mounted () {
      this.$nextTick(() => {
        this.$store.dispatch('resetSearchResult')
      })
    },
    data () {
      return {
        searchType: 0, // 用户 0 群 1
        searchText: '',
        searchList: [],
        errMsg: '',
        // 首次加载标志，因为mount和watch会有时序问题，首次加载不显示errMsg
        firstEntry: true
      }
    },
    watch: {
      searchResult (val, oldVal) {
        if (this.searchType === 1) {
          this.errMsg = '群功能DEMO待开发'
          return
        }
        if ((val.length === 0) && (!this.firstEntry)) {
          this.errMsg = '无记录'
        } else {
          this.errMsg = ''
        }
        this.searchList = val
      }
    },
    computed: {
      searchResult () {
        let result = []
        if (this.searchType === 1) {
          return result
          // result = this.$store.state.searchedTeams
        } else if (this.searchType === 0) {
          result = this.$store.state.searchedUsers.map(item => {
            item.nick = item.nick || item.account
            item.link = `/im_web/namecard/${item.account}`
            item.avatar = item.avatar || config.defaultUserIcon
            return item
          })
        }
        return result
      }
    },
    methods: {
      enterCard(link){
        console.log(link)
        this.$router.push(link)
      },
      searchUser () {
        if (this.searchText === this.$store.state.userUID) {
          this.searchList = []
          this.errMsg = '别看了，就是你自己！'
        } else {
          this.$store.dispatch('searchUsers', {
            accounts: [this.searchText]
          })
        }
      },
    },
    created() {
      const searchText = this.$route.params.searchText
      this.searchText = searchText
      console.log('searchText', searchText)
      console.log(this.$store.dispatch('searchUsers', {
        accounts: [this.searchText]
      }))
    }
  }
</script>

