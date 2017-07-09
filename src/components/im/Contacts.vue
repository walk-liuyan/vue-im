<template>
  <div>
    <Row>
      <Col>
      <Menu theme="light" active-name="1" width="100%">
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

    computed: {
      friendslist () {
        return this.$store.state.friendslist.filter(item => {
          let account = item.account
          let thisAttrs = this.userInfos[account]
          let alias = thisAttrs.alias ? thisAttrs.alias.trim() : ''
          item.alias = alias || thisAttrs.nick || account
          item.link = `/im_web/namecard/${item.account}`
          if ((!thisAttrs.isFriend) || (thisAttrs.isBlack)) {
            return false
          }
          return true
        })
      },
      blacklist () {
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
      userInfos () {
        return this.$store.state.userInfos
      }
    },
    methods: {
      enterChat(path) {
        console.log(path)
        this.$router.push({path: `${path}`})
      }
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
