webpackJsonp([29],{jsHW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("3cXf"),o=a.n(n),s=a("wSez"),c=a("AG0B"),r={name:"myinfo",data:function(){return{isUnscRollable:!1,backParentPage:!1,banners:[],recomList:[]}},props:[],filters:{photoFilter:function(t){return t.productPhotos.length<=0?"./static/images/ak.png":t.productPhotos[0].photoURL},priceFilter:function(t){return t||0===t?"￥"+Number(t).toFixed(2):""}},components:{"mt-header":s.Header,"mt-button":s.Button,"mt-badge":s.Badge,comHeaderTitle:c.a},created:function(){var t=this,e=new Date,a=e.getFullYear(),n=e.getMonth()+1;n<10&&(n="0"+n);var o=e.getDate();o<10&&(o="0"+o);var s=a+"-"+n+"-"+o+" 23:59:59";this.$ajax({url:t.webRoot+"/seachAd",data:{endDate:s,pageNo:"channelHjBanner",isValid:1}}).then(function(e){console.log("channelMaBanner: ",e),e.data.success?t.banners=e.data.data:(t.banners="",console.log("banner模块不存在"))}).catch(function(t){console.log(t)}),this.$options.methods.getProRecom(t,s,"channelHjTj",s,t.recomList,"商品推荐模块无数据")},mounted:function(){this.$emit("changeClass",!1)},updated:function(){this.$nextTick(function(){this.backParentPage})},destroyed:function(){this.$emit("changeClass",!0)},methods:{jumpDetail:function(t,e){this.$router.push({path:"/product_detail",query:{proid:t.productID}})},getProRecom:function(t,e,a,n,s,c){t.$ajax({url:t.webRoot+"/seachSt",data:{endDate:e,pageNo:a,isValid:1}}).then(function(e){if(e.data.data[0]){var r=e.data.data[0].showID;e.data.success?t.$ajax({url:t.webRoot+"/seachStDetail",data:{endDate:n,showID:r,isValid:1}}).then(function(e){if(console.log(a,s),e.data.success){s.splice(0);var n=[];for(var r in e.data.data)n.push(e.data.data[r].productID);t.$ajax({url:t.webRoot+"/product/getProductByProductNumber",data:o()({memberId:t.$store.state.memberId,productNumbers:n}),headers:{"Content-Type":"application/json;charset=utf-8"},transformRequest:[function(t){return t}]}).then(function(t){if(console.log("productNumbers: ",t),t.data.success&&t.data.data.length>0)for(var e in t.data.data)s.push(t.data.data[e]);t.data.success||(s=[],console.log(c)),console.log("akRecommend",s)}).catch(function(t){console.log(t)})}else s=[],console.log(c)}).catch(function(t){console.log(t)}):(s=[],console.log(c))}}).catch(function(t){console.log(t)})},changeClassOne:function(t){t?(this.backParentPage=!0,this.isUnscRollable=!1):(this.backParentPage=!1,this.isUnscRollable=!0)}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"wrap has_header_wrap"},[a("section",{staticClass:"wrap_in"},[a("com-header",{attrs:{titles:"罕见病频道"}},[a("template",{slot:"style-def"})],2),t._v(" "),t._l(t.banners,function(t,e){return a("div",{staticClass:"banner-2"},[a("div",{staticClass:"banner-2-in"},[a("a",{attrs:{href:t.advertisementUrl}},[a("img",{attrs:{src:t.advertisementPhoto}})])])])}),t._v(" "),t.recomList.length?a("div",{staticClass:"pros"},[a("ul",{staticClass:"d_flex"},t._l(t.recomList,function(e,n){return a("li",{on:{click:function(a){t.jumpDetail(e,n)}}},[a("img",{attrs:{src:t._f("photoFilter")(e),alt:e?e.productName:""}}),t._v(" "),a("h3",[t._v(t._s(e?e.productName:""))]),t._v(" "),a("span",[t._v(t._s(e?e.spec:""))]),t._v(" "),a("h2",[a("span",{staticClass:"r_color"},[t._v(t._s(t._f("priceFilter")(e?e.ourPrice:"")))])])])}))]):t._e()],2),t._v(" "),a("transition",{attrs:{name:"fade"}},[a("router-view",{on:{changeClass:t.changeClassOne}})],1)],1)},staticRenderFns:[]};var l=a("vSla")(r,i,!1,function(t){a("x4Bf")},"data-v-3e3a30d2",null);e.default=l.exports},x4Bf:function(t,e){}});
//# sourceMappingURL=29.abd09c586875e8dd3f7d.js.map