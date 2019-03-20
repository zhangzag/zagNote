
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