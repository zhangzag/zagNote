const handlebars = require('handlebars');

//产品详情 - 获取图片列表第一张图片
handlebars.registerHelper('getFirstPhoto', function(datas) {
    if( datas.length<=0 ){
        //没有图片
        return '';
    }
    return datas[0].photoURL;
});
//价格格式化
handlebars.registerHelper('formatPrice', function(price) {
    if( !price ){
        return '0.00';
    }

    return '¥' + price.toFixed(2);
});



//获取html模板
export function renderHtml(template, data){
    //预编译模板
    let template = handlebars.compile(template);
    //匹配json内容
    let result = template(data);

    return result;
};

/**
 * 获取url参数 -- 中文
 *
 * @export
 * @param {*} name
 * @returns
 */
export function getQueryString(name) { 
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    let r = window.location.search.substr(1).match(reg); 

    if (r != null) return decodeURI(r[2]); return null; 
};
