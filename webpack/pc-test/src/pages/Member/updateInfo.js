require('./style/mem_ind.scss');

import { webRoot, curDate, memberId, memberInfo } from '@/assets/js/globalDefine.js';
import sha256 from 'sha-256-js';
import Cookies from 'js-cookie';

import { renderHtml, setLazyLoad } from '@/util/util.js';

import { getVipInfo, updateMemberInfo } from 'apis/user.js';

import memleftblockHtml from './memleftblock.hbs';


$(function(){
    layui.use('layer',function(){
        //左导航
        let memleftblockHtmlString = renderHtml(memleftblockHtml, { curPageId: 1 });
        $('.member_l_block').html(memleftblockHtmlString);

        // console.log('memberInfo: ', memberInfo)
        //更新出生年月日
        let newBirth = '';
        //获取会员信息
        if(memberInfo){
            let now = new Date(),
                hour = now.getHours();
            
            //昵称
            $('.info_name input[name="userName"]').val(memberInfo.memberName);

            //如果没有选择性别 默认选择 男性
            if( !memberInfo.sex ){
                $('#unSet').prop({checked: true});
            }else{
                memberInfo.sex=='男'?$('#male').prop({checked: true}):$('#female').prop({checked: true});
            }

            //生日
            newBirth = memberInfo.birthday;

            layui.use('laydate', function(){
                let laydate = layui.laydate,
                    defaultDay = '';
            
            if ( memberInfo.birthday ) {
                defaultDay = memberInfo.birthday;
            }else{
                defaultDay = curDate;
            }
            //执行一个laydate实例
            laydate.render({
                elem: '#birInput', //指定元素
                value: defaultDay, //初始日期
                max: curDate,//最大值
                done: function( value, date ){
                    // console.log( value, date )
                    // 更新出生年月日
                    newBirth = value;
                },
            });
            });

            //头像
            if( memberInfo.picURL ){
                // $('.ir_upImg img').attr('data-original', memberInfo.picURL);
                $('.info_right .ir_upImg .img').append('<img class="lazy" data-original="'+ memberInfo.picURL +'">')
                //图片懒加载
                setLazyLoad({
                    el: '.ir_upImg .img img',
                });
            }
        }else{
            getMemberInfo();
        }

        //点击触发选择头像
        $('.ir_upImg .img').on('click', 'img', function(event) {
            event.preventDefault();
            $('#upload_img_btn').trigger('click');
        });

        
        let setAuthorization = memberId?sha256( memberId + 'akjk') : '';
        //实例化一个plupload上传对象
        var uploader = new plupload.Uploader({
            browse_button : 'upload_img_btn', //触发文件选择对话框的按钮，为那个元素id
            url : webRoot + '/upLoadByMemberId', //服务器端的上传页面地址
            // flash_swf_url : 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
            // silverlight_xap_url : 'js/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            multipart: true,//以multipart/form-data的形式来上传文件
            multi_selection: false,//是否可以在文件浏览对话框中选择多个文件
            file_data_name: 'file',//指定文件上传时文件域的名称，默认为file
            multipart_params: { //上传时的附加参数，以键/值对的形式传入，服务器端可是使用$_POST来获取这些参数
                memberID: memberId,
            },
            headers:{
                'Authorization': setAuthorization,
            },
            resize: {
                // width: 120,
                // height: 120,
                crop: true,
                quality: 60,
                preserve_headers: true
            },
            filters: {
                mime_types: [ //只允许上传图片
                    { title : "Image files", extensions : "jpg,jpeg,png" }, 
                ],
                max_file_size : '1024kb', //最大只能上传1M的文件
            }
        });  
        uploader.init();
        //绑定各种事件
        uploader.bind('FilesAdded',function(uploader,files){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
            var file = files[0].getNative();
            var reader = new FileReader();
            var img = new Image();

            reader.readAsDataURL(file);//转成base64
            reader.onload = function(){
                img.src = this.result;
                // uploader.files[0] = this.result;
            }
            //清空
            $('.user_img_con').html('');
            $('.user_img_con').append(img);
            $('.user_img_layer').stop(true,true).fadeIn(300);
        });
        uploader.bind('BeforeUpload',function(uploader,file){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
            // console.log('BeforeUpload', uploader, file);
            // var file = file.getNative();
            // var reader = new FileReader();
            // reader.readAsDataURL(file);//转成base64
            // reader.onload = function(){
            // 	uploader.files[0] = this.result;
            // 	file = this.result;
            // }
        });
        uploader.bind('UploadFile',function(uploader,file){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
            // console.log('UploadFile', uploader, file);
            // var file = file.getNative();
            // var reader = new FileReader();
            // reader.readAsDataURL(file);//转成base64
            // reader.onload = function(){
            // 	uploader.files[0] = this.result;
            // }
        });

        uploader.bind('UploadProgress',function(uploader,file){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
            var percent = file.percent;

            //显示上传动画
            $('.user_img_in .img_load_layer').css('display','block');
        });

        uploader.bind('FileUploaded',function(uploader,file,responseObject){
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作

            //隐藏上传动画
            $('.user_img_in .img_load_layer').css('display','none');
            // console.log(uploader,file,responseObject)
            var res = JSON.parse(responseObject.response);

            layui.use('layer', function(){
            var layer = layui.layer;

            if( res.success ){
                var files = file.getNative();
                var reader = new FileReader();
                var img = new Image();

                reader.readAsDataURL(files);//转成base64
                reader.onload = function(){
                    img.src = this.result;
                    // uploader.files[0] = this.result;
                }
                //清空
                $('.ir_upImg .img').html('');
                $('.ir_upImg .img').append(img);
                
                getMemberInfo();
                layer.msg('头像上传成功!');
            }else{
                layer.msg('头像上传失败!');
            }
            $('.user_img_layer').stop(true,true).fadeOut(300);
            }); 
        });
        //上传出错事件
        uploader.bind('Error',function(uploader,errObject){
            // console.log('错误： ', uploader,errObject);
            layui.use('layer', function(){
            var layer = layui.layer;

                if( errObject.code == '-600' ){
                    layer.msg('头像上传失败，请选择小于1M的图片！');
                }else{
                    layer.msg('头像上传失败，' + errObject.message);
                }
            }); 
        });
        
        //上传
        $('.user_img_options .bp_green').click(function(event) {
            uploader.start();
        });

        //取消上传图片
        $('.user_img_options .bp_default').click(function(event) {
            $('.user_img_layer').stop(true,true).fadeOut(300);
        });

        $('#upload_img_btn').change(function(event) {
            console.log('改变： ',event)
        });

        //保存信息
        $('.btn_comfirm').click(function(event) {
            //会员名
            let memberName = $('.info_name input[name="userName"]').val();
            //性别
            let sex = $('input[name=sex]:checked').val();
            //出生年月 newBirth
            //头像
            updateMemberInfo({
                memberID: memberId,//会员id
                memberName: memberName,//会员名称,
                sex: sex,//性别
                birthday: newBirth,//出生年月日
                // file: '', //头像
            })
            .then((res)=>{
                // console.log("success", res);
                layui.use('layer', function(){
                var layer = layui.layer;
                
                    if( !res.success ){
                        layer.msg( res.msg );
                    }else{
                        //更新头部会员姓名
                        $('.shortcut .isLogin .login').text( memberName );          
                        
                        //更新信息
                        getMemberInfo();
                        layer.msg( '修改成功！' );
                    }
                }); 
            })
            .catch(err=>{
                console.log("信息修改失败，", err);
                layer.msg( "信息修改失败" );
            });
            
        });

        //获取会员信息
        function getMemberInfo(){
            getVipInfo({
                id: memberId
            })
            .then(res=>{
                // console.log('获取会员信息：', res)
                if(!res || res.msg==="鉴权验证不通过！"){
                    layer.msg('获取会员信息失败', { icon: 2, time: 1000 },function(){ window.location.href= "/"; });
                    return;
                }

                let domain = window.location.host;
                domain = domain.indexOf('.ak1ak1.com') == -1 ? '': '.ak1ak1.com';
                //储存会员信息
                Cookies.set('_mi', JSON.stringify( res ), { expires: 7, path: '/', domain: domain });
            })
            .catch(err=>{
                console.log('获取会员信息出错，', err)
                layer.msg('获取会员信息出错', { icon: 2, time: 1000 },function(){ window.location.href= "/"; });
            });
        }
    });

});





