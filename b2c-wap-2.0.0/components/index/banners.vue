<template>
  <section class="banners">
    <swiper
      :options="swiperOptionImg"
      ref="mySwiper-img"
      class="swiperBanners">
      <swiper-slide v-for='(wbs,index) in wapBanners' :key="index">
        <a :href="wbs.advertisementUrl"><img v-lazy="wbs.advertisementPhoto"></a>
      </swiper-slide>
    </swiper>
    <!-- 分页 -->
    <div class="banners_pagination swiper-pagination"></div>
  </section>
</template>

<script>
  import { curDate } from '~~/utils/utils.js'

  export default {
    async asyncData ({app, params}){
      let dataObject = {};

      console.log('ddddddddddddddd')
      await app.$axios({
        url: '/seachAd',
        data: {
          endDate: curDate,
          pageNo: 'wapBanners',
          isValid: 1
        }
      })
        .then(res=>{
          console.log('获取banner', res)
          dataObject.banners = res.data.data;
        })
        .catch(err=>{
          console.log('获取banner出错了,', err)
        });

      return {
        banners: dataObject.banners || '',
      }
    },
    data (){
      return {
        banners: '',
        swiperOptionImg: {
          autoplay: true,
          nested: true, //用于嵌套相同方向的swiper时，当切换到子swiper时停止父swiper的切换
          pagination: { //使用分页导航
            el: '.banners_pagination',
            clickable :true,
          }
        },
        wapBanners: [{"advertisementID":111,"endDate":1601222400000,"advertisementUrl":"http://www.ak1ak1.com/topic/wap/190.html","advertisementPhoto":"http://img.ak1ak1.com:90/a/2019/1/14/1547460393281.jpg","haveDetail":0,"medium":1,"startDate":1538130415000},{"advertisementID":116,"endDate":1600358400000,"advertisementUrl":"http://www.ak1ak1.com/topic/wap/183.html","advertisementPhoto":"http://img1.ak1ak1.com:90/a/2018/12/30/1546136084454.jpg","haveDetail":0,"medium":1,"startDate":1537264567000},{"advertisementID":117,"endDate":1563984000000,"advertisementUrl":"http://m.ak1ak1.com/mpros/1893.html","advertisementPhoto":"http://img2.ak1ak1.com:90/a/2019/1/7/1546825561243.jpg","haveDetail":0,"medium":1,"startDate":1532515755000},{"advertisementID":118,"endDate":1564070400000,"advertisementUrl":"http://m.ak1ak1.com/mpros/1499.html","advertisementPhoto":"http://img.ak1ak1.com:90/a/2019/1/9/1546996864907.jpg","haveDetail":0,"medium":1,"startDate":1532594907000},{"advertisementID":119,"endDate":1564070400000,"advertisementUrl":"http://m.ak1ak1.com/mpros/1096.html","advertisementPhoto":"http://img3.ak1ak1.com:90/a/2019/1/9/1546996909520.jpg","haveDetail":0,"medium":1,"startDate":1532595020000},{"advertisementID":121,"endDate":1564070400000,"advertisementUrl":"http://www.ak1ak1.com/topic/wap/156.html","advertisementPhoto":"http://img.ak1ak1.com:90/a/2019/1/7/1546823827399.jpg","haveDetail":0,"medium":1,"startDate":1532595164000}]
      }
    },
    mounted (){
      console.log('curDate: ', curDate)
    },
  }
</script>
