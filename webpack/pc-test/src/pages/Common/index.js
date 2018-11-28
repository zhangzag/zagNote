require('@/assets/style/common.css');
console.log('这是公共的js文件')
let webRoot = '/tapi';


// 获取分类
$.ajax({
    url: webRoot + '/productType/getProductTypeLis',
})
.success(res=>{
    console.log('res: ', res)
})
.error(err=>{
    console.log('err: ', err)
})
.done(function(res) {
    console.log("获取分类", res);
});

// 获取分类 end