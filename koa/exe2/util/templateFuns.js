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
/***** 过滤 end *****/

module.exports = {
    filterFirstPhoto,
    filterPrice,
    filterPriceOnlyNum,
}