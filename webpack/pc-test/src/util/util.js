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
//个人中心菜单
handlebars.registerHelper('curMemPage', function(curPageId, menuId) {
    if( curPageId === menuId ){
        return 'cur';
    }else{
        return '';
    }
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

/**
 * 获取url数据
 *
 * @export
 * @returns
 */
export function getUrlData(){
    let location = window.location;

    // http://localhost:3002/login.html
    return {
        hash: location.hash,// 
        host: location.host,// "localhost:3002"
        hostname: location.hostname,// "localhost"
        href: location.href,// "http://localhost:3002/login.html"
        origin: location.origin,// "http://localhost:3002"
        pathname: location.pathname,// "/login.html"
    }
}

/**
 *设置图片懒加载
 *
 * @export
 * @param {*} { el="img.lazy", placeholder='../../assets/images/myImg.png', effect='fadeIn', threshold=200 }
 */
export function setLazyLoad( { el="img.lazy", placeholder='myImg.png', effect='fadeIn', threshold=200 } ){
    // console.log('el: ', el)
    return $(el).lazyload({
        placeholder: require( '@/assets/images/' + placeholder ), //用图片提前占位
          // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
        effect, // 载入使用何种效果
          // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
        threshold, // 提前开始加载
    });	
}
