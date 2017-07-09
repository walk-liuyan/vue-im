<template>
  <div class="bg-white rounded box_shadow overflow-hidden p-20">
    <div class="ivu-article">
      <h1>统计表格</h1>
      <div class="anchor p-t-20 p-b-10">
        <h2>说明</h2>
      </div>
      <p>请参考：<a href="https://www.iviewui.com/components/table">https://www.iviewui.com/components/table</a>，需要功能是 <b class="c-red">筛选</b>、 <b class="c-red">排序</b>、 <b class="c-red">导出</b>。</p>
      <blockquote>注意：代码风格</blockquote>
      <div>
        <div>
          表格放这里
        </div>
        <Page :total="100" show-total></Page>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  export default{
    components: {},
    data() {
      return {}
    },
    computed: {},
    methods: {},
    created() {

    },
  }
</script>
