import Vue from 'vue'

const filters = {
    //价格
    priceFilter: (data)=>{
        if( data || data === 0 ){
            return '￥' + Number(data).toFixed(2);
        }else{
            return '';
        }
    },
    //图片
    photoFilter: (data)=>{
        if(!data ){return}
        
        if( !data.productPhotos || data.productPhotos.length <= 0){
            return '../assets/images/default_bg.jpg';
        }else{
            return data.productPhotos[0].photoURL + '?120*120';
        } 
    },
    //订单状态
    orderStatusFilter: (data)=>{
        // 1.在线未支付    2.货到付款待确认    3.待发货    4.待收货    5.物流待收款    6.财务待收款    7.已完成    8.已取消    9.支付中
        if( data == 1 || data == 9 ){ return '待付款' }
        else if( data == 3 || data == 2 ){ return '待发货' }
        else if( data == 4 ){ return '待收货' }
        else if( data == 5 || data == 6 || data == 7 ){ return '已完成' }
        else if( data == 8 ){ return '已取消' }
    },
    //时间过滤，"2019-01-23 09:37:15" - "2019-01-23"
    timeToYMD: ( data ) => {
        if(!data && !data[0]){return}
        let arr = data.split(' ');
    
        // replace(/-/g, ".")
        if( arr[0].indexOf('-') ){
            return arr[0].replace(/-/g, '.')
        }
        
        return arr[0];
    },
    // 药品图片类型 处方,OTC甲,OTC乙
    imgType: ( data ) => {
      if( data == 1 ){
        return 'RX';
      }else if(data == 2){
        return 'OTC-2'
      }else if(data == 3){
        return 'OTC-1'
      }
    },
}

Object.keys( filters ).forEach( (key) => {
    Vue.filter(key, filters[key]);
} );
