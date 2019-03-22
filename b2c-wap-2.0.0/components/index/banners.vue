<template>
  <section class="banners">
    <div v-swiper:mySwiper="swiperOptionImg" ref="mySwiper-img" class="swiperBanners">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(wbs,index) in list' :key="wbs.advertisementID">
          <a :href="wbs.advertisementUrl"><img v-lazy="wbs.advertisementPhoto"></a>
        </div>
      </div>
      <div class="banners_pagination swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  require('swiper/dist/css/swiper.css')

  if(process.browser){
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper)
  }

  export default {
    data (){
      return {
        swiperOptionImg: {
          autoplay: true,
          nested: true, //用于嵌套相同方向的swiper时，当切换到子swiper时停止父swiper的切换
          pagination: { //使用分页导航
            el: '.banners_pagination',
            // el: '.swiper-pagination',
            clickable :true,
          }
        },
      }
    },
    props: {
      list: {
        default: ''
      }
    },
    components: {
      // swiper,
      // swiperSlide,
    },
    mounted (){

    },
  }
</script>

<style scoped lang="scss">
  section.banners {
    padding: 0;
  }
  .banners {
    height: 160px;
    position: relative;
  }
  .banners img {
    width: 100%;
  }
  .swiperBanners {
    height: 160px;
  }
  .swiperBanners a {
    height: 160px;
  }
  .swiperBanners img {
    width: 100%;
    height: 160px;
  }
  .banners .banners_pagination {
    bottom: 0;
    width: 100%;
    overflow: hidden;
    text-align: center;
    bottom: 10px;
  }
  .banners .swiper-pagination-bullet {
    outline: none;
    margin:0 3px;
    background-color: #fff;
    opacity: 0.66;
    width: 8px;
    height: 8px;
  }
  .banners .swiper-pagination-bullet-active {
    opacity: 1;
  }
</style>
