
//根据id获取文章列表
export const getArtById = ({app, data})=>{
  if(!app || !data){
    console.error('缺少参数');
    return false;
  }

  return new Promise((resolve, reject)=>{
    app.$axios.post('/healthAdvisory/getHealthAdvisoryByParentTypeID', data).then(res=>{resolve(res)}).catch(err=>{reject(err)})
  })
}

