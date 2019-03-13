
//搜索广告推荐
export const searchAdvs = ({app, data}) =>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/seachAd', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//查询商品推荐模块数据
export const searchSt =  ( {app, data} )=>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise( (resolve, reject) => {
    app.$axios.post('/seachSt', data).then( ( res ) => { resolve(res) } ).catch( err => { reject( err ); } )
  } );
};

//根据模块id获取详细信息
export const getStDetail =  ( {app, data} )=>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise( (resolve, reject) => {
    app.$axios.post('/seachStDetail', data).then( ( res ) => { resolve(res) } ).catch( err => { reject( err ); } )
  } );
};
