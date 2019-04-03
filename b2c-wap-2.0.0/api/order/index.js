
//获取全部订单
export const getOrder = ({app, data})=>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise( (resolve, reject) => {
    app.$axios({
      url: '/order/getOrderByMemberId',
      method: 'post',
      data: data,
    }).then( ( res ) => {resolve(res);} ).catch( (err) => {reject( err );} );
  } );
}