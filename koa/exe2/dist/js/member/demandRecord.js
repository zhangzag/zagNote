function tips(e,a){layui.use("layer",function(){layer.msg(e,{icon:a,time:1e3})})}function imgSrcInit(e){return e}function requireGtag(e){var a=e.title||"提交需求登记",n=e.content||{};gtag("event",a,n)}$(function(){var l=null;function o(r){$.ajax({url:"/require/getRequire",type:"POST",dataType:"json",data:{memberId:$.getGlobalVal().memberId,page:r,limit:10},success:function(e){if(l=e.data,$("#demandCount").html(e.count),!e.success||e.count<=0)return $(".nothing").css({display:"block"}),$(".list-body").css({display:"none"}),$("#page").css({display:"none"}),$("#demandCount").html(e.count),!1;$(".nothing").css({display:"none"}),$(".demand-main .list-body").html("").css({display:"block"});for(var a="",n=0;n<l.length;n++){var s=n+1,t="",i="";i=null==l[n].product?(t='<div class="p-img"><a style="" href="javascript:void(0)"><img src="'+l[n].photodURL+'"></a></div><div class="p-text"><p class="p1">'+l[n].productName+'</p><p class="p3" style="color: #e00000">该商品不存在，或已下架！</p></div>','<p class="op2">删除</p>'):(t='<div class="p-img"><a href="/products/'+l[n].product.productID+'.html"><img src="'+imgSrcInit(l[n].product.photodURL)+'"></a></div><div class="p-text"><p class="p1">'+l[n].productName+'</p><p class="p2">'+l[n].product.spec+'</p><p class="p3">￥'+l[n].product.ourPrice+" <span>x "+l[n].qty+"</span></p></div>",'<p class="op1" demandIndex="'+n+'">重新提交需求</p><p class="op2">删除</p>');var p="<p><span>登记人：</span>"+l[n].realName+"</p><p><span>手机号：</span>"+l[n].phone+"</p><p><span>性别：</span>"+(1==l[n].sex?"男":"女")+"</p><p><span>年龄：</span>"+(null==l[n].age?"":l[n].age)+"</p><p><span>身份证号：</span>"+(null==l[n].carId?"":l[n].carId)+"</p><p><span>送货地址：</span>"+(null==l[n].deliveryAddress?"":l[n].deliveryAddress)+"</p><p><span>留言：</span>"+(null==l[n].remark?"":l[n].remark)+"</p><p><span>门店配送：</span>"+(1==l[n].isStore?"是":"否")+'</p><p><span>处方图：</span><img width="160" src="'+(null==l[n].pictureURL?"":l[n].pictureURL)+'"></p>';a+='<div class="item" requireID="'+l[n].requireID+'"><div class="number">'+s+'</div><div class="info">'+t+'</div><div class="dem-info">'+p+'</div><div class="dem-time">'+l[n].operationDate+'</div><div class="options">'+i+"</div></div>"}$(".demand-main .list-body").html(a),r<=1&&layui.use("laypage",function(){layui.laypage.render({elem:"page",count:e.count,limit:10,layout:["page","prev","next"],theme:"#a7a7a7",jump:function(e,a){a||o(e.curr)}})})},error:function(e){console.log(e)}})}o(1),$(".demand-main .list-body").on("click",".op1",function(){var e=Number($(this).attr("demandIndex")),a=l[e],n=a.qty;$.require({path:4,product:a,qty:n,requireGtag:requireGtag,listReload:o})}),$(".demand-main .list-body").on("click",".op2",function(){var a=this;layui.use("layer",function(){layer.confirm("您确定删除该条需求吗?",{icon:3,title:"删除提示"},function(e){layer.close(e),$.ajax({url:$.getGlobalVal().webRoot+"/require/delRequire",type:"POST",dataType:"json",data:{memberId:$.getGlobalVal().memberId,requireId:$(a).parent().parent().attr("requireID")},success:function(e){e.success&&(layui.use("layer",function(){layer.msg(e.msg,{time:1e3})}),o(1))},err:function(e){console.log(e)}})},function(e){layer.close(e)})})})});