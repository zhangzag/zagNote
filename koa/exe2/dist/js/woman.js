function floorNameInit(a){return a}function imgUrl(a){return a}$(function(){$.ajax({url:$.getGlobalVal().webRoot+"/seachAd",type:"POST",dataType:"json",data:{endDate:$.getGlobalVal().curDate,pageNo:"pWomanBanner",isValid:1},success:function(a){$("#roteAdv").html("");for(var t=0;t<a.data.length;t++){var e='<li id="'+(t+1)+'">';e+='<a target="_blank" href="'+a.data[t].advertisementUrl+'">',e+='<img src="'+imgUrl(a.data[t].advertisementPhoto)+'" alt="">',e+="</a>",e+="</li>",$("#roteAdv").append(e)}$("#roteAdv").after("<div class='slider' id='roteAdv_nav' style=''>").cycle({prev:"#turnL",next:"#turnR",fx:"slideX",speed:"300",timeout:5e3,pager:"#roteAdv_nav",before:function(){},pagerAnchorBuilder:function(a,t){var e=a+1;return 0==a?'<span id="c'+e+'"  class="cur"></span>':'<span  id="c'+e+'"></span>'},after:function(a,t,e,r){$("#roteAdv_nav").find("span").attr("class","");$("#c"+t.id).attr("class","cur")}})}}),$.ajax({url:$.getGlobalVal().webRoot+"/seachAd",type:"POST",dataType:"json",data:{endDate:$.getGlobalVal().curDate,pageNo:"pcWomanFloorName",isValid:1},async:!1,success:function(a){if(!a.success||0===a.data.length)return!1;for(var t=a.data,e=0;e<t.length;e++){var r='<div class="floor"><h3><a target="_blank" href="'+t[e].advertisementUrl+'"><img src="'+t[e].advertisementPhoto+'" width="282" height="28"></a></h3><div class="flContent"><div class="left"></div><div class="right"><div class="right-top"></div><div class="right-bottom"></div></div></div></div>';$(".wo-main").append(r)}}}),$.ajax({url:$.getGlobalVal().webRoot+"/seachAd",type:"POST",dataType:"json",data:{endDate:$.getGlobalVal().curDate,pageNo:"pcWomanFloorBanner",isValid:1},async:!1,success:function(a){if(!a.success||0===a.data.length)return!1;for(var t=a.data,e=0;e<t.length;e++)$(".wo-main").find(".floor .left").eq(e).html('<a target="_blank" href="'+t[e].advertisementUrl+'"><img src="'+imgUrl(t[e].advertisementPhoto)+'" ></a>')}}),$.ajax({url:$.getGlobalVal().webRoot+"/seachSt",type:"POST",dataType:"json",data:{endDate:$.getGlobalVal().curDate,pageNo:"pcWomanProduct",isValid:1}}).done(function(a){if(!a.success||0===a.data.length)return!1;for(var t=a.data,l=0;l<t.length;l++)$.ajax({url:$.getGlobalVal().webRoot+"/seachStDetail",type:"POST",dataType:"json",data:{endDate:$.getGlobalVal().curDate,showID:t[l].showID,isValid:1},async:!1}).done(function(a){if(!a.success||0===a.data.length)return!1;for(var t=a.data,e=[],r=0;r<t.length;r++)e.push(t[r].productID);$.ajax({url:$.getGlobalVal().webRoot+"/product/getProductByProductNumber",type:"POST",dataType:"json",data:JSON.stringify({memberId:$.getGlobalVal().memberId,productNumbers:e}),headers:{"Content-Type":"application/json;charset=utf-8"},async:!1}).done(function(a){for(var t=a.data,e="",r=0;r<2&&a.data[r];r++)e+='<div class="product"><div class="pro-l"><h6>'+t[r].productName+"</h6><p>"+t[r].isHelpFor+'</p><div class="btn-wrap"><span class="pri">￥'+t[r].ourPrice+'</span><a target="_blank" class="det" href="/products/'+t[r].productNumber+'.html">查看详情</a></div></div><div class="pro-img"><a target="_blank" href="/products/'+t[r].productNumber+'.html"><img class="lazy" data-original="'+(t[r].productPhotos[0]?t[r].productPhotos[0].photoURL:"")+'" alt="'+t[r].productName+'" title="'+t[r].productName+'"></a></div></div>';$(".wo-main .floor").eq(l).find(".right-top").append(e);for(var o="",d=2;d<6&&a.data[d];d++)o+='<div class="pro-list"><a target="_blank" href="/products/'+t[d].productNumber+'.html"><img class="lazy" data-original="'+(t[d].productPhotos[0]?t[d].productPhotos[0].photoURL:"")+'" alt="'+t[d].productName+'" title="'+t[d].productName+'"></a><h6><a target="_blank" href="/products/'+t[d].productNumber+'.html">'+t[d].productName+"</a></h6><p>"+t[d].isHelpFor+"</p><span>￥"+t[d].ourPrice+"</span></div>";$(".wo-main .floor").eq(l).find(".right-bottom").append(o),lazyLoad({imgSrc:"/static/images/ak_300x300.jpg"})})})})});