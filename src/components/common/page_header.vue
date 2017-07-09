<template>
  <div class="page_header bg-white box_shadow">
    <div class="container">
      <Row>
        <Col span="4" class="p-t-15 p-b-15">
        <img src="http://img.hidoge.cn/logo/logo-300x300.jpg" alt="" height="45px">
        </Col>
        <Col span="20">
        <Menu v-show="showSet" mode="horizontal" theme="light" active-name="1" class="r">
          <Submenu name="5">
            <template slot="title">
              <Icon type="person"></Icon>
              设置
            </template>
            <Menu-group title="使用">
              <router-link to="/im_web/general">
                <Menu-item name="3-2">个人资料</Menu-item>
              </router-link>
            </Menu-group>
          </Submenu>
        </Menu>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script type="text/babel">
  import FnMixins from '../../assets/js/fn-mixins'

  export default{
    data() {
      return {
        showSet: false,
      }
    },
    watch: {
      myInfo() {
        console.log('watch', this.$store.state.myInfo)
      },
    },
    computed: {
      myInfo() {
        console.log('computed', this.$store.state.myInfo)
        const res = this.$store.state.myInfo
        if (res.account) {
          this.showSet = true
        }
      },
    },
    created() {
      console.log('created', this.$store.state.myInfo)
    },
    mixins: [FnMixins],
  }
</script>
