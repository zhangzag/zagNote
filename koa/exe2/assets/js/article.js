$(function() {
    var webRoot = $.getGlobalVal().webRoot;
    var memberId = $.getGlobalVal().memberId;
    var webOrigin = $.getGlobalVal().webOrigin;
    var flag = false;

    layui.use('laypage', function() {
        var laypage = layui.laypage;

        //获取文章列表tab
        $.ajax({
            url: webRoot + '/healthAdvisoryType/getHealthAdvisoryTypeList',
        })
        .done(function(res) {
            // console.log("获取文章列表tab： ", res);
            if (!res.success || res.data.length === 0) {
                console.log('没有文章!')
                return false;
            }

            for (var i = 0; i < res.data.length; i++) {
                //文章列表
                var lists = res.data[i].healthAdvisoryList;

                if( res.data[i].healthAdvisoryTypeID == 26 || res.data[i].healthAdvisoryTypeName=='专题' ){
                    continue;
                };
                //tab
                $('.tabs ul').append('<li ' + (i === 0 ? 'class="cur"' : '') + ' data-type="' + res.data[i].healthAdvisoryTypeID + '" data-tname="' + res.data[i].healthAdvisoryTypeName + '"><a href="javascript:;">' + res.data[i].healthAdvisoryTypeName + '</a></li>');
            };
            //文章列表类型
            // $('.con').append('<ul></ul>');
            //获取文章
            var hatId = $('.tabs ul li.cur').attr('data-type');
            var hatName = $('.tabs ul li.cur').attr('data-tname');
            getArts( hatId, hatName );
        });

        //获取文章列表
        function getArts( healthAdvisoryTypeId, healthAdvisoryTypeName, page, limit ){
            var page = page || 1;
            var limit = limit || 10;

            $.ajax({
                url: webRoot + '/healthAdvisory/getHealthAdvisoryByParentTypeID',
                type: 'POST',
                dataType: 'json',
                data: {
                    parentTypeID: healthAdvisoryTypeId,
                    page: page,
                    limit: limit
                },
            })
            .done(function(res) {
                //console.log("获取文章列表: ", res);
                $('.con ul li').remove();
                if( res.code == 0 && res.data.length>0 ){
                    for( var i=0; i<res.data.length; i++ ){
                        //$('.con ul').append('<li><h3 class="inlie_block"><a href="./article_detail.html?typeName=' + healthAdvisoryTypeName + '&ptId='+ res.parentTypeID +'&id=' + res.data[i].healthAdvisoryID + '">' + res.data[i].networkTitle + '</a><i>' + timeFilter(res.data[i].createTime) + '</i></h3><div class="con_wrap">' + res.data[i].content + '</div></li>');
                        $('.con ul').append('<li><h3 class="inlie_block"><a href="/topic/health/'+res.data[i].healthAdvisoryID+'.html">' + res.data[i].networkTitle + '</a><i>' + timeFilter(res.data[i].createTime) + '</i></h3><div class="con_wrap">' + res.data[i].content + '</div></li>');
                        
                        //超出隐藏
                        $('.con_wrap').eq(i).attr("displayLength", "350"); 
                    };
                }else{
                    $('.con ul').append('<li><p>暂无文章</p></li>');
                };

                if( page === 1 ){
                    //分页
                    layui.use('laypage', function() {
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'pagings', //注意，这里的 pagings 是 ID，不用加 # 号
                            count: res.count, //数据总数，从服务端得到
                            limit: limit,
                            layout: ['page', 'prev', 'next'],
                            groups: 9,//连续出现的页码个数
                            jump: function(obj, first){
                                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                // console.log(obj.limit); //得到每页显示的条数
                                
                                //首次不执行
                                if(!first){
                                  getArts( healthAdvisoryTypeId, healthAdvisoryTypeName, obj.curr, limit )
                                }
                            }
                        });
                    });
                }
            });
        };

        //切换tab
        $('.tabs').on('click', 'li', function() {
            var dataType = $(this).attr('data-type');

            if ($(this).hasClass('cur')) {
                return false;
            } else {
                $(this).addClass('cur').siblings().removeClass('cur');
                //获取文章
                var hatId = $('.tabs ul li.cur').attr('data-type');
                var hatName = $('.tabs ul li.cur').attr('data-tname');
                getArts( hatId, hatName );
                // $('.con ul').removeClass('cur');
                // $('.con ul[data-type=' + dataType + ']').addClass('cur');
            }
        });
        


        //获取分页
        //function getPagination (  ){
        //	var parentTypeId = $('.tabs li.cur').attr('data-type');
//
	    //    $.ajax({
	    //            url: webRoot + '/healthAdvisory/getHealthAdvisoryByParentTypeID',
	    //            data: { parentTypeID: parentTypeId },
	    //    })
	    //    .done(function(res) {
	    //        // console.log("获取分页11", res);
	    //        if (res.success) {
	    //            //执行一个laypage实例
	    //            laypage.render({
	    //                elem: 'pagings', //注意，这里的 test1 是 ID，不用加 # 号
	    //                count: res.count, //数据总数，从服务端得到
	    //                layout: ['page', 'prev', 'next'],
	    //                groups: 1
	    //            });
	    //        }
	    //    });
        //};

    });
});



//格式化时间
function timeFilter(timestamp){
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();

    return Y+M+D+h+m+s;
}