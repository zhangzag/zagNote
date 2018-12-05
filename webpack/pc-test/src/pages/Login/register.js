require('./style/login.scss');
require('./style/register_header.scss');
require('./style/register.scss');

import { webRoot } from '@/assets/js/globalDefine.js';
import { verifyPhone, verifyPwd } from '@/util/verify';
import { verifyCodeApi, verifyMessageApi, changePasswordApi } from 'apis/user.js';


$('.header-mc .h-title').text('会员注册');
//立即注册
$('.header-mc .registerp').css('display', 'block');

$(function(){

});