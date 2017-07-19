<template>
  <div>
    <Row>
      <Col span="6" class="bg-white m-r-20" style="height: 700px">
      <Menu v-if="menuOpen" mode="horizontal" theme="light" active-name="1">
        <Menu-item name="1" @click.native="goToLink('/im_web/session')">
          <Icon type="ios-paper"></Icon>
          最近联系
        </Menu-item>
        <Menu-item name="2" @click.native="goToLink('/im_web/contacts')">
          <Icon type="ios-people"></Icon>
          联系人
        </Menu-item>
        <Menu-item name="3" @click.native="searchFriend">
          <Icon type="ios-search"></Icon>
          搜索好友
        </Menu-item>
      </Menu>
      <Input v-if="searchOpen"
             v-model="searchText"
             icon="search"
             placeholder="请输入好友名称..."
             @keyup.enter.native="enterSearch"
             @keyup.esc.native="enterEsc"
             style="width:385px"
             onblur="upperCase()"
      ></Input>
      <div>
        <router-view name="tabsWrapper"></router-view>
      </div>
      </Col>
      <Col span="16">
      <div class="bg-white" style="height: 700px;overflow: hidden">
        <router-view name="contentWrapper"></router-view>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script type="text/babel">

  export default{
    components: {},
    data() {
      return {
        menuOpen: true,
        searchOpen: false,
        searchText: '',
      }
    },
    computed: {},
    methods: {
      enterEsc() {
        this.searchFriend()
      },
      searchFriend() {
        this.menuOpen = !this.menuOpen
        this.searchOpen = !this.searchOpen
      },
      goToLink(link) {
        this.$router.push(`${link}`)
      },
      enterSearch() {
        if (this.searchText) {
          this.searchFriend()
          this.$router.push(`/im_web/searchuser/${this.searchText}`)
        } else {
          this.$Message.warning('sweetie! 要输入信息哟')
        }
      },
      searchUser() {
        this.firstEntry = false
        if (this.searchType === 1) {
          this.$vux.alert.show({
            title: '群功能DEMO待开发',
          })
        } else if (this.searchType === 0) {
          if (this.searchText === this.$store.state.userUID) {
            this.searchList = []
            this.errMsg = '别看了，就是你自己！'
          } else {
            this.$store.dispatch('searchUsers', {
              accounts: [this.searchText],
            })
          }
        }
      },
    },
    created() {
    },
  }
</script>
