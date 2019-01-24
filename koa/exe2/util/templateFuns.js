/***** 过滤 *****/

//过滤第一张图片
const filterFirstPhoto = (data)=>{
    if( !data || data.length<=0 ){
        return ''
    }
    return data[0].photoURL;
}

//过滤价格
const filterPrice = (data)=>{
    if(!data && data==0){
        return `¥ 0.00`
    }

    return `¥ ${data.toFixed(2)}`;
}
const filterPriceOnlyNum = (data)=>{
    if(!data && data==0){
        return `0.00`
    }

    return `${data.toFixed(2)}`;
}

//商品类型图标
const imgType = (data)=>{
    if( data == 1 ){
      return 'RX';
    }else if(data == 2){
      return 'OTC-2'
    }else if(data == 3){
      return 'OTC-1'
    }
}

//数字向上取整
const numCeil = (data)=>{
    if( !data && data!=0 ){
        return 
    }
    return Math.ceil(data);
}

/***** 过滤 end *****/

module.exports = {
    filterFirstPhoto,
    filterPrice,
    filterPriceOnlyNum,
    imgType,
    numCeil,
}