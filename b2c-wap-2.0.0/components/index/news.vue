<template>
  <!-- 健康资讯 -->
  <section class="information" v-show="artLists.length>0">
    <div class="information_img inline_block"></div>
    <div class="information_liist inline_block">
      <ul :style="{ top }">
        <li
          v-for="(al,index) in artLists"
          :class="index | artClassFilter"><a :href='"http://m.ak1ak1.com/news/detail"+al.healthAdvisoryID+".html"'>{{ al.networkTitle }}</a></li>
      </ul>
    </div>
    <div class="information_more inline_block">
      <!-- <a href="http://mnews.ak1ak1.com">更多</a> -->
      <a href="http://m.ak1ak1.com/news">更多</a>
    </div>
  </section>
  <!-- 健康资讯 end -->
</template>

<script>
  export default {
    data (){
      return {
        artListsIndex: 0,//当前文章
      }
    },
    props: {
      artLists: {
        type: Array,
        default: [],
      }
    },
    computed: {
      top() {
        return -this.artListsIndex * 0.5625 + 'rem';
      },
    },
    filters: {
      //文章Class
      artClassFilter ( index ){
        var curIndex = index+1;

        if( curIndex%2 == 0 ) {
          return 'newImg-2';
        }else{
          return 'newImg-1';
        }
      },
    },
    mounted() {
      let topTimer = null;
      let newsLength = this.artLists.length;

      if(newsLength>0){
        topTimer = setInterval(()=>{
          if(this.artListsIndex>=newsLength-2){
            this.artListsIndex = 0;
            return
          }
          this.artListsIndex++;
        }, 3000);
      }
    },
  }
</script>

<style scoped lang="scss">

  /*** information ***/
  .information {
    /*height: 1.09375rem;*/
    height: 42px;
    font-size: 0;
    margin-bottom: 12px;
  }
  .information>* {
    font-size: 14px;
    position: relative;
  }
  .information_img {
    width: 52px;
    height: 42px;
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    background-size: 98px auto;
    -webkit-background-size: 98px auto;
    background-position: -23px -23px;
  }
  .information_liist {
    color: #555555;
    font-size: 14px;
    width: 256px;
    height: 42px;
    overflow: hidden;
  }
  .information_liist ul {
    position: relative;
    top: 0;
    transition: top 0.3s ease-out;
  }
  .information_liist li {
    line-height: 22px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 24px;
    padding-right: 24px;
  }
  .information_liist li>a {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .newImg-1 {
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    background-size: 98px auto;
    -webkit-background-size: 98px auto;
    background-position: -37.5px -80px;
  }
  .newImg-2 {
    background-image: url('~assets/images/icons_index.png');
    background-repeat: no-repeat;
    background-size: 98px auto;
    -webkit-background-size: 98px auto;
    background-position: -37.5px -112px;
  }
  .information_more {
    width: 38px;
    height: 42px;
    color: #a7a7a7;
    float: right;
  }
  .information_more a {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: url('~assets/images/arr_r1.png');
    background-repeat: no-repeat;
    background-position: right center;
    -webkit-background-size: 7px auto;
    background-size: 7px auto;
    color: #a7a7a7;
    font-size: 12px;
  }

</style>
