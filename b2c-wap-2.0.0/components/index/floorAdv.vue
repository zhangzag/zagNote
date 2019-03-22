<template>
  <!-- 广告位-1 -->
  <section class="fadv fadv-1" id="floorAdv1">
    <mt-swipe :auto="2000" class="adv_wrap">
      <mt-swipe-item v-for="(fa,index) in floorAdv1" :key="index"><a :href="fa.advertisementUrl"><img :src="fa.advertisementPhoto"></a></mt-swipe-item>
    </mt-swipe>
  </section>
  <!-- 广告位-1 end -->
</template>

<script>
  export default  {
    data (){
      return {

      }
    },
    props: {
      floorAdv1: {
        type: Array,
        default: [],
      },
    },
    components: {

    },
  }
</script>

<style scoped lang="scss">

  /*** fadv ***/
  section.fadv {
    padding: 0;
    /*height: 118px;*/
    margin-bottom: 12px;
  }
  .adv_wrap {
    height: 150px;
  }
  section.fadv a {
    width: 100%;
    height: 100%;
  }
  section.fadv img {
    width: 100%;
    height: 100%;
  }
</style>
