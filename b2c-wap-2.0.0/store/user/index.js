const CryptoJS = require("crypto-js");
//秘钥必须为：8/16/32位
const aseKey = "akjk2018";
const { getcookiesInClient, setStorage, getStorage } = require('@/utils/utils.js')

// let memberId = '', memberInfo = '';
// if(process.browser){
//   if( getStorage('_ami') && getStorage('_ami').data ){
//     //会员id
//     memberId = CryptoJS.DES.decrypt(getStorage('_ami').data, aseKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);

//     //会员信息
//     if( getStorage('_lsmemin') && getStorage('_lsmemin').data ){
//       memberInfo = CryptoJS.DES.decrypt(getStorage('_lsmemin').data, aseKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
//     }
//   }else{
//     //清除存储信息
//     setStorage('_lsmemin', { data: '', time: new Date().getTime(), expires: 1/24/60/60 });
//   }
// }

// console.log('memberId : ', memberId)
// console.log('memberInfo : ', memberInfo)

const moduleA = {
    namespaced: true,
    state: {
      memberIdData:'',
      memberInfoData: '', 
    },
    mutations: {
      saveMemberId (state, data){
        if(data){
          let message = JSON.stringify( data )
          
          // 加密
          let encrypt = CryptoJS.DES.encrypt(message, aseKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
          
          setStorage('_ami', {
            data: encrypt,
            time: new Date().getTime(),
            expires: 7
          });
        }

        // state.memberId = data;
        state.memberIdData = data;
      },
      saveMemberInfo (state, data){
        if(data){
          let message = JSON.stringify( data )
          
          // 加密
          let encrypt = CryptoJS.DES.encrypt(message, aseKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString();
          
          setStorage('_lsmemin', {
            data: encrypt,
            time: new Date().getTime(),
            expires: 7
          });
        }

        // state.memberInfo = data;
        state.memberInfoData = data;
      }
    },
    getters: {
      memberId: state => {
        if( state.memberIdData ){ return state.memberIdData }
        else {
          if( getStorage('_ami') && getStorage('_ami').data ){
            //会员id
            return CryptoJS.DES.decrypt(getStorage('_ami').data, aseKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
          }else{
            return '';
          }
        }
      },
      memberInfo: state => {
        if( state.memberInfoData ){ return state.memberInfoData }
        else{
          if( getStorage('_ami') && getStorage('_ami').data && getStorage('_lsmemin') && getStorage('_lsmemin').data ){
            //会员信息
            let datas = CryptoJS.DES.decrypt(getStorage('_lsmemin').data, aseKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);

            return JSON.parse(datas);
          }
          // else{
          //   //清除存储信息
          //   setStorage('_lsmemin', { data: '', time: new Date().getTime(), expires: 1/24/60/60 });
          //   return ''
          // }
        }
      }
    }
}

export default moduleA
