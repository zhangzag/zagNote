<template>
  <!-- 阿康推荐 -->
  <section class="recommend" id="akRecommend">
    <div class="r_header"><p class="zone_title">阿康推荐</p><!-- <a href="javascript:;">更多精选</a> --></div>
    <div class="rec_con">
      <ul class="d_flex" v-if="akRecommend.length>0">
        <li v-for="(ard, index) in akRecommend" @click="jumpDetail(ard)" :key="ard.productID">
          <div class="f_left">
            <!--<img v-lazy="ard.productPhotos.length>0?ard.productPhotos[0].photoURL + '?120*120':''" :alt="ard.productName">-->
            <img v-lazy="ard.productPhotos[0].photoURL + '?120*120'" :alt="ard.productName">
          </div>
          <div class="rc_info">
            <h3>{{ ard.productName }}</h3>
            <h2 class="r_color">
              <p class="f_left"><i>￥</i>{{ ard.ourPrice }}</p>
              <p class="f_right"><span>￥{{ ard.price }}</span></p>
            </h2>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <!-- 阿康推荐 end -->
</template>

<script>
  export default {
    data (){
      return {

      }
    },
    props: {
      akRecommend: {
        type: Array,
        default: [],
      }
    },
  }
</script>

<style scoped lang="scss">
  /*** recommend ***/
  .recommend {
    margin-bottom: 12px;

    .rec_con li {
      box-sizing: border-box;
      width: 50%;
      height: 75px;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      padding: 10px 10px 10px 0;
      &:nth-of-type(2n) {
        border-right: 0;
      }
      &>.f_left {
        width: 56px;
        height: 56px;
        overflow: hidden;
        margin-right: -56px;

        img {
          width: 100%;
        }
      }
    }
  }
  .r_header {
    height: 18px;
    line-height: 18px;
    margin-bottom: 8px;

    .zone_title {
      float: left;
      color: #0f904e;
      font-size: 0.44rem;
      font-weight: bold;
    }
    a {
      float: right;
      color: #555555;
      font-size: 0.375rem;
      padding-right: 0.3125rem;
      background-image: url('~assets/images/arr_r2.png');
      background-repeat: no-repeat;
      background-position: right center;
      -webkit-background-size: 0.1875rem 0.3125rem;
      background-size: 0.1875rem 0.3125rem;
    }
  }
  .recommend .rc_info {
    padding-left: 60px;
    h3 {
      font-size: 12px;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 40px;
      line-height: 20px;
      font-weight: normal;
    }
    &>p {
      font-size: 0.3125rem;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      height: 22px;
    }
    h2 {
      font-size: 14px;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      i {
        font-style: normal;
        font-size: 10px;
      }
      span {
        font-style: normal;
        font-size: 10px;
        color: #a7a7a7;
        text-decoration: line-through;
        font-weight: normal;
      }
    }
  }
</style>
