
//获取热门搜索
export const hotSearch = ({app, data}) =>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/getHotSearchByProductTypeID', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//获取热门搜索详情
export const hotSearchDetail = ({app, data}) =>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/getHSDetailByParams', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}
