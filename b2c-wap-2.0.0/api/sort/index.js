
//获取分类
export const getSort = ({app}) =>{
    if(!app){
      console.error('缺少参数');
      return false;
    }
  
    return new Promise((resolve, reject)=>{
      app.$axios.post('/productType/getProductTypeList').then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
    });
}

//获取一级分类
export const oneType = ({app}) => {
  if(!app){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/productType/getAllOneLevelProductType').then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}

//获取二级分类
export const twoType = ({app, data}) => {
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/productType/getAllTwoLevelProductType', data).then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}
