$(function(){$.getGlobalVal().webRoot,$.getGlobalVal().memberId,$.getGlobalVal().webOrigin,$.getGlobalVal().ImgSrc;var a=$.getQueryString("cid");$.ajax({url:"/prescription/getPrescriptionById",data:{prescriptionId:a}}).done(function(a){if(a.success){$(".create_time").text(a.data.createTime),$(".detail_hospital").text(a.data.hospitalName),$(".detail_cate").text(a.data.offices),$(".detail_name").text(a.data.sufferer),$(".detail_phone").text(a.data.phone),$(".detail_sex").text(1==a.data.sex?"男":"女"),$(".detail_age").text(a.data.age?a.data.age:""),$(".zd_con").text(a.data.diagnosed);for(var e=a.data.prescriptionDetail,t=0;t<e.length;t++)$(".addrp_cols").append('<div class="addrp_col"><span>'+(t+1)+"</span><h3>"+e[t].medicine+"</h3><p>"+e[t].spec+"</p></div>");$(".cjf_img").append('<img src="'+a.data.pictureURL+'" >')}})});