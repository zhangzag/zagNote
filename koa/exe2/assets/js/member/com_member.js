/*
* @Author: zag
* @Date:   2018-07-21 10:37:32
* @Last Modified by:   zag
* @Last Modified time: 2018-07-27 11:15:47
*/

//判断是否登录
if( !$.getGlobalVal().memberId ){
    window.location.replace('/login.html');
    
	// $.comConfirm({
	// 	conText: '请先登录!',
	// 	//取消
	// 	cancel: function(){
	// 		window.history.go(-1);
	// 	},
	// 	conform: function(){
	// 		window.location.replace('/login.html');
	// 	}
	// });

	//终止页面加载
	// var xmlhttp;
 //    if (window.XMLHttpRequest) {
 //        // code for IE7+, Firefox, Chrome, Opera, Safari
 //        xmlhttp = new XMLHttpRequest();
 //    }else {
 //        // code for IE6, IE5
 //        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 //    }
 //    xmlhttp.abort();
 //    //停止继续加载页面，相当于点击stop按钮。
 //    if (!!(window.attachEvent && !window.opera))
 //    {
 //        document.execCommand("stop");// code for IE
 //    }else{
 //        /**
 //         * stops window loading
 //         * code for  Firefox, Chrome, Opera, Safari
 //         */
 //        window.stop();
 //    }
}