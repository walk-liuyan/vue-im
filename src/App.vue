<template>
  <div id="app">
    <PageHeader></PageHeader>
    <div class="p-t-20"></div>
    <div class="container">
      <transition name="fade-fast">
        <router-view></router-view>
      </transition>
    </div>
    <div class="p-t-15 p-b-15 tc c-bluegray">
      2011-2016 &copy; <a href="http://code.hidoge.cn" class="c-bluegray" target="_blank">hiDoge</a>
    </div>
  </div>
</template>

<script>
  import PageHeader from './components/common/page_header'
  import ApiMixin from './assets/js/apis-mixins'

  export default {
    name: 'app',
    components: {
      PageHeader,
    },
    data() {
      return {
        data: null,
      }
    },
    mixins: [ApiMixin],
  }
</script>
