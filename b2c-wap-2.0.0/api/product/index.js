const Qs = require('qs')
var stringify = require('json-stringify-safe');

//根据商品编码获取商品信息
export const getProductByProductNumber = ({app, data})=>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise( (resolve, reject) => {
    app.$axios({
      url: '/product/getProductByProductNumber',
      method: 'post',
      data: data,
      headers: {'Content-Type' : 'application/json;charset=utf-8'},
      transformRequest: [function (data) {
        let curData = data;
        if( process.browser ){
          curData = JSON.stringify(Qs.parse(data))
        }else{
          curData = stringify(Qs.parse(data))
        }

        return curData
      }]
    }).then( ( res ) => {resolve(res);} ).catch( (err) => {reject( err );} );
  } );
}

//获取商品列表
export const productList = ({app, data})=>{
  if( !app || !data ){
    console.error('缺少参数');
    return
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/product/getProductList', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//通过 productNumber 获取商品信息
export const productInfo = ({app, data})=>{
  if( !app || !data ){
    console.error('缺少参数');
    return
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/product/findProductByProductNumber', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//收藏商品
export const addCollection = ({app, data}) =>{
  if( !app || !data ){
    console.error('缺少参数');
    return
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/favorite/addFavorite', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//删除收藏商品
export const delCollection = ({app, data}) =>{
  if( !app || !data ){
    console.error('缺少参数');
    return
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/favorite/delFavoriteBymemberIdAndProId', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//优惠券
export const getCoupon = ({app, data}) =>{
  if( !app || !data ){
    console.error('缺少参数');
    return
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/coupon/getCouponApi', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}
