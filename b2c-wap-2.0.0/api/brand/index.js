
export const brandList = ({app})=>{
  if(!app){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/brand/getBrandList').then(res=>{ resolve(res) }).catch(err=>{ reject(err) });
  });
}
