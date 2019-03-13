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
