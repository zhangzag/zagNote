$(function(){
	var webRoot = $.getGlobalVal().webRoot;
	var memberId = $.getGlobalVal().memberId;
	var webOrigin = $.getGlobalVal().webOrigin;
	var flag = false;
	  
	  //获取列表
	  getList({ 
	  	webRoot: webRoot,
	  	memberId: memberId, 
	  	page: 1,
	  });
});

function getList( param ){
	$.ajax({
		// url: param.webRoot + '/prescription/getPrescription',
		url: '/prescription/getPrescription',
		data: {
			memberId: param.memberId,
			page: param.page,
			limit: 10,
		},
	})
	.done(function(res) {
		// console.log("success", res);
		if( res.success ){
			var datas = res.data;
			var num = res.data.length;

			//处方笺条数
			$('.lists>p>.c_orange').text( res.count );

			//清空
			$('.lists tbody').html('');

			//获取列表
			for (var i = 0; i < num; i++) {
				$('.lists tbody').append('<tr><td class="tc">'+ (i+1) +'</td><td class="tc"></td><td class="tc"></td><td class="tc"></td><td class="tc"></td><td class="tc"><div><a class="c_green" href="./prescript_detail.html?cid='+ datas[i].prescriptionID +'">查看处方笺</a></div></td></tr>');

				//患者
				$('.lists tbody tr').eq(i).find('td').eq(1).append('<div><h4>'+ datas[i].sufferer +'</h4><p><span>'+ filterSex(datas.sex) +'</span><span>'+ filterAge(datas[i].age) +'</span></p></div>');
				//医院
				$('.lists tbody tr').eq(i).find('td').eq(2).append('<div>'+ datas[i].hospitalName +'</div>');
				//临床诊断
				$('.lists tbody tr').eq(i).find('td').eq(3).append('<div>'+ datas[i].diagnosed +'</div>');
				//提交时间
				$('.lists tbody tr').eq(i).find('td').eq(4).append('<div>'+ datas[i].createTime +'</div>');
			};

			if( param.page <= 1 ){

				layui.use('laypage', function(){
				  var laypage = layui.laypage;

				  //分页
				  laypage.render({
				    elem: 'pagings', //注意，这里的 test1 是 ID，不用加 # 号
				    count: res.count, //数据总数，从服务端得到
				    layout: ['page', 'prev', 'next'],
				    groups: 9,//连续出现的页码个数
				    limit: 10,//每页显示的条数
				    jump: function(obj, first){
				    	// console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
	    				// console.log(obj.limit); //得到每页显示的条数
	    				//首次不执行
					    if(!first){
					      //获取列表
						  getList({webRoot: param.webRoot,memberId: param.memberId,page: obj.curr,});
					    }
				    },
				  });
				});
			}
		}
	});
}

//患者姓名过滤器
//性别过滤器
function filterSex( data ){
	if( data == 1 ){
		return '男';
	}else if( data === 0 ){
		return '女';
	}else{
		return '';
	}
};
//年龄过滤器
function filterAge( data ){
	if( !data ){
		return '';
	}else {
		return data + '岁';
	}
};