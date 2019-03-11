	
$(function () {
   var ind = $('.picBtn>img').attr('src').indexOf('/sendCode');
   var webRoot = $('.picBtn>img').attr('src').substring(0, ind);


  $('.picBtn').click(function(){
    getPicCode();
  })
  function getPicCode(){
     // 获取图形码
    $('.picBtn img').attr("src", webRoot+'/sendCode?n=' + Math.random());
//   }
  }
  getPicCode();

  /*联系人电话*/
  var contactPhoneValidate = function () {
      var strP = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      var phone = $.trim($("#userPhone").val());
      if (phone == "") {
          showTip("#phoneErr", "请输入正确的手机号!");
          return false;
      }
      if (phone.length<11) {
          showTip("#phoneErr", "请输入正确的手机号!");
          return false;
      }
      if (!strP.test(phone)) {
          showTip("#phoneErr", "请输入正确的手机号!");
          return false;
      }
      //showSuccess("#phoneErr");
      $("#phoneErr").html('').css({'display': 'none'})
      return true;
  };

  //检查密码（空、长度和密码强度验证）
  var checkPsw = function(){
      var userPsw = $("#userPsw").val();
      if(userPsw == ""){
          showTip("#pswTip","请输入密码!");
          return false;
      }
      if(userPsw.length < 6 || userPsw.length > 16){
          showTip("#pswTip","密码为6-16位数字、字母或者符号!");
          return false;
      }
      $("#pswTip").html('').css({'display': 'none'})
      return true;
  };

  // 检查重复密码（长度和密码一致验证）
  var cheCkcheckPsw = function(){
      var checkPassword = $("#repeatPsw").val();
      if(checkPassword == ""){
          showTip("#repeatPswTip","请再次输入密码!");
          return false;
      }
      if(checkPassword.length < 6 || checkPassword.length > 16){
          showTip("#repeatPswTip","确认密码为6-16位数字、字母或者符号!");
          return false;
      }
      if(!checkPasswordValidate()){/*确认密码长度及一致验证*/
          return false;
      }
      $("#repeatPswTip").html('').css({'display': 'none'})
      return true;
  };

  //密码和重复密码一致性验证
  var checkPasswordValidate = function(){

      var userPsw = $("#userPsw").val();
      var checkPassword = $("#repeatPsw").val();
      if(userPsw != checkPassword){
          showTip("#repeatPswTip","两次输入密码不一致，请再次输入密码!");
          return false;
      }else{
          
      }
      $("#repeatPswTip").html('').css({'display': 'none'})
      return true;
  };

  var showTip = function(tipId,errorText){
    var tip = $(tipId) ;
    tip.html(errorText) ;
    tip.show() ;
  };

  //倒计时
    var t = null;
    function countDown(times){
        $('#getPhoneCode').html(times+'s后重新获取').attr({'disabled': 'disabled'});
        clearInterval(t)
        t = setInterval(function(){
            times--;
            $('#getPhoneCode').html(times + 's后重新获取')
            //console.log(times)
            if(times <= 0){
                clearInterval(t);
                $('#getPhoneCode').html('重新获取验证码').attr({'disabled': false});
                $(".steps").step("previous");
                stepNum--;
                $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
            }
        },1000)
    }

    // 步骤条
    function initStep() {
        $(".steps").step({
          stepNames: ['安全验证','短信验证码', '设置新密码', '设置完成'],
          initStep: 1
        })
    }
    var stepNum = 0
    var timeToIndex = 6
    initStep();

    // 下一步
    var t = null;
    var nextCode = null;
    $('#nextStep').click(function(){
      var mobile = $.trim($("#userPhone").val());
      var picCode = $.trim($("#picCode").val());
      var phoneCode = $.trim($("#phoneCode").val());
      var userPsw = $.trim($("#userPsw").val());
      var repeatPsw = $.trim($("#repeatPsw").val());
      
      if(stepNum == 0){
         if(!contactPhoneValidate()){
            return false;
         }
         // console.log(mobile,picCode)
         $.ajax({
            // url: $.getGlobalVal().webRoot + '/verifyCode',
            url: webRoot + '/verifyCode',
            type: 'POST',
            dataType: 'json',
            data: {
               telephone: mobile,//电话号码
               code: picCode,//图形验证码
            },
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
         }).done(function(res){
            // console.log(res);
            if(res.msg != true){
              showTip("#picErr",res.msg);
              getPicCode();
              return false;
            }
            $(".steps").step("next");
            stepNum++;
            $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
            countDown(120);
          
        }).fail(function(err){
            console.log(err);
            getPicCode();
        })         
      }else if(stepNum == 1){
        // 第二步 短信验证码
        $.ajax({
            // url: $.getGlobalVal().webRoot + '/verifyMessage',
            url: '/verifyMessage',
            type: 'POST',
            dataType: 'json',
            data: {
               telephone: mobile ,//电话
               randomCode: phoneCode,//短信验证码
            }
         }).done(function(res){
            // console.log(res);
            nextCode = res.num;
            $(".steps").step("next");
            stepNum++;
            $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
         }).fail(function(err){
            // console.log(err);
            showTip("#picErr","短信验证码错误，请重新获取!");
            $(".steps").step("previous");
            stepNum--;
            $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
            //clearInterval(t);
         })
      }else if(stepNum == 2){
         // 第三步 修改密码
         if(!checkPsw()){
            return false;
         }
         if(!cheCkcheckPsw()){
            return false;
         }
         if(!checkPasswordValidate()){
            return false;
         }

         $.ajax({
            // url: $.getGlobalVal().webRoot + '/changePassword',
            url: '/changePassword',
            type: 'POST',
            dataType: 'json',
            data: {
               telephone: mobile,
               randomCodeTwo: nextCode,
               password: userPsw
            }
         }).done(function(res){
            // console.log(res);

            if(res.code == 101){
              showTip("#pswTip","您设置的密码与原密码相同，请重新设置!");
              return false;
            }

            $(".steps").step("next");
            stepNum++;
            $('.forget').eq(stepNum).css({'display':'block'}).siblings().css({'display': 'none'});
            $('.fotget-ok .se span').eq(0).html(timeToIndex);
            $('#nextStep').eq(0).html('返回首页');
            setInterval(function(){
               timeToIndex--;
               $('.fotget-ok .se span').eq(0).html(timeToIndex);
               if(timeToIndex < 0){
                  window.location.href = 'index.html'
               }
            },1000)
         }).fail(function(err){
            console.log(err);
         })     
      }else{
        window.location.href = 'index.html'
      }
   })

});

