<template>
  <div class="layout_in">
    
    <!-- 头部标题 -->
    <com-header :titles="title">
      <!-- <template slot="style-def"></template> -->
    </com-header>
    <!-- 头部标题 end -->

    <nuxt ref="main"/>

  </div>
</template>

<script>
export default {
  data (){
    return {
      title: '',
    }
  },
  mounted (){
    this.title = this.$refs.main.$children[0].headTitle;
  }
}
</script>

<style lang="scss" scoped>
  .contain {
    margin-top: 40px;
  }
</style>
