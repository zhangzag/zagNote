<template>
  <!-- 底部tab -->
  <section class="btab">
    <div class="tabs">
      <div v-swiper:mySwiper="swiperOption" ref="mySwiper" class="swiperBanners">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a :class="{cur: selected=='105'}"  href="javascript:;"><span>个人推荐</span></a>
          </div>
          <div class="swiper-slide">
            <a :class="{cur: selected=='105'}"  href="javascript:;"><span>慢性病</span></a>
          </div>
          <div class="swiper-slide">
            <a :class="{cur: selected=='105'}"  href="javascript:;"><span>健康保健</span></a>
          </div>
          <div class="swiper-slide">
            <a :class="{cur: selected=='105'}"  href="javascript:;"><span>男性频道</span></a>
          </div>
          <div class="swiper-slide">
            <a :class="{cur: selected=='105'}"  href="javascript:;"><span>女性频道</span></a>
          </div>
        </div>
      </div>
    </div>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="105">
        <ul class="tab_list" v-if="personalRecom.length>0">
          <li id="pr" v-for="pr in personalRecom" @click="jumpDetail(pr)">
            <div class="tpro_img"><img :src="pr | photoFilter" :alt="pr.productName"></div>
            <div class="tpro_info">
              <h3>{{ pr.productName }}</h3>
              <span>{{ pr.spec }}</span>
              <h3 class="r_color">{{ pr.ourPrice | priceFilter }}</h3>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="106">
        <ul class="tab_list" v-if="manPage.length>0">
          <li id="mp" v-for="mp in manPage" @click="jumpDetail(mp)">
            <div class="tpro_img"><img :src="mp | photoFilter" :alt="mp.productName"></div>
            <div class="tpro_info">
              <h3>{{ mp.productName }}</h3>
              <span>{{ mp.spec }}</span>
              <h3 class="r_color">{{ mp.ourPrice | priceFilter }}</h3>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="107">
        <ul class="tab_list" v-if="healthyPage.length>0">
          <li id="hp" v-for="hp in healthyPage" @click="jumpDetail(hp)">
            <div class="tpro_img"><img :src="hp | photoFilter" :alt="hp.productName"></div>
            <div class="tpro_info">
              <h3>{{ hp.productName }}</h3>
              <span>{{ hp.spec }}</span>
              <h3 class="r_color">{{ hp.ourPrice | priceFilter }}</h3>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="108">
        <ul class="tab_list" v-if="malePage.length>0">
          <li id="mpe" v-for="mpe in malePage" @click="jumpDetail(mpe)">
            <div class="tpro_img"><img :src="mpe | photoFilter" :alt="mpe.productName"></div>
            <div class="tpro_info">
              <h3>{{ mpe.productName }}</h3>
              <span>{{ mpe.spec }}</span>
              <h3 class="r_color">{{ mpe.ourPrice | priceFilter }}</h3>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="109">
        <ul class="tab_list" v-if="femalePage.length>0">
          <li id="fp" v-for="fp in femalePage" @click="jumpDetail(fp)">
            <div class="tpro_img"><img :src="fp | photoFilter" :alt="fp.productName"></div>
            <div class="tpro_info">
              <h3>{{ fp.productName }}</h3>
              <span>{{ fp.spec }}</span>
              <h3 class="r_color">{{ fp.ourPrice | priceFilter }}</h3>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </section>
  <!-- 底部tab end -->
</template>

<script>
  import Vue from 'vue'
  import 'mint-ui/lib/style.css'

  // if(process.browser){
  //   const {Swipe, SwipeItem, Navbar, TabItem, TabContainer, TabContainerItem, Cell} = require('mint-ui')
  // }
  if(process.browser){
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    const {Tabbar, TabItem, TabContainer, TabContainerItem, Swipe, SwipeItem } = require('mint-ui')

    Vue.use(VueAwesomeSwiper)
    // Vue.component(Swipe.name, Swipe);
    // Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
  }
  // import {Swipe, SwipeItem, Navbar, TabItem, TabContainer, TabContainerItem, Cell} from 'mint-ui'

  export default {
    data (){
      return {
        selected: '105',
        swiperOption: {
          // notNextTick: true,
          autoplay: 0,
          slidesPerView: 4.5,
          setWrapperSize :true,
          slideToClickedSlide: true, //点击slide会过渡到这个slide。
        },
      }
    },
    props: {
      personalRecom: {
        type: Array,
        default: [],
      },
      manPage: {
        type: Array,
        default: [],
      },
      healthyPage: {
        type: Array,
        default: [],
      },
      malePage: {
        type: Array,
        default: [],
      },
      femalePage: {
        type: Array,
        default: [],
      },
    },
    components: {
      // 'mt-tab-container': TabContainer,
      // 'mt-tab-container-item': TabContainerItem,
      // 'mt-cell': Cell,
    },
  }
</script>

<style scoped lang="scss">

</style>
