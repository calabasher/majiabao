import JSbridge from "./JSbridge";

export default {
  // 判断进入的用户是否有token
  checkToken(){
    let local = JSON.parse(localStorage.getItem('localToken'))
    if(local === null){
      JSbridge.callHandler('login', 'ok', (data) => {
        console.log(data)
      })
    }else {
      if(parseInt(local.token) === 1){
        JSbridge.callHandler('login', 'ok', (data) => {
          console.log(data)
        })
      }else{
        return true
      }
    }
  },
  checkNumber(value){
    let reg = /^(-)?\d+(\.\d+)?$/
    if(reg.exec(value) === null || value === ""){
      return false
    } else {
      return true
    }
  },
  changeCash(value){
    let num = (value || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  },
  // 印尼日期格式化 20200116 ==> 07/27/2019
  changeIndonesiaDate(value){
    let num = (value || 0).toString(), result = '';
    if (num.length == 8) {
      let day = num.slice(6,8)
      let month = num.slice(4,6)
      let year = num.slice(0,4)
      result = day + '/' + month + '/' + year
    }
    return result;
  },
  // 印尼时间格式化 "2020-01-16 20:54" ==> 08-01-2020 21:15
  changeIndonesiaTime(value){
    let num = (value || 0).toString(), result = '';
    if (num.length == 16) {
      let day = num.slice(8,10)
      let month = num.slice(5,7)
      let year = num.slice(0,4)
      let time = num.slice(11, 16)
      result = day + '-' + month + '-' + year + ' ' + time
    }
    return result;
  },
  // 根据银行id获取银行图片
  getImgsById(id){
    let bankObj = {};
    switch (id) {
      case 125:
        bankObj.id = 125;
        bankObj.name = 'BANK LAIN';
        bankObj.imgUrl = require('@/assets/images/bankList/others_bank.png');
        break;
      case 93:
        bankObj.id = 93;
        bankObj.name = 'MANDIRI';
        bankObj.imgUrl = require('@/assets/images/bankList/mandiri.png');
        break;
      case 92:
        bankObj.id = 92;
        bankObj.name = 'BRI';
        bankObj.imgUrl = require('@/assets/images/bankList/doku_bri.png');
        break;
      case 91:
        bankObj.id = 91;
        bankObj.name = 'INDOMARET';
        bankObj.imgUrl = require('@/assets/images/bankList/INDOMARET@3x.png');
        break;
      case 90:
        bankObj.id = 90;
        bankObj.name = 'SINARMAS';
        bankObj.imgUrl = require('@/assets/images/bankList/SINNARMASSYARIAH@3x.png');
        break;
      case 89:
        bankObj.id = 89;
        bankObj.name = 'DANAMON';
        bankObj.imgUrl = require('@/assets/images/bankList/doku_danamon.png');
        break;
      case 88:
        bankObj.id = 88;
        bankObj.name = 'ALFAMART';
        bankObj.imgUrl = require('@/assets/images/bankList/alfamart_img.png');
        break;
      case 87:
        bankObj.id = 87;
        bankObj.name = 'PERMATA';
        bankObj.imgUrl = require('@/assets/images/bankList/doku_permata.png');
        break;
      case 86:
        bankObj.id = 86;
        bankObj.name = 'BNI';
        bankObj.imgUrl = require('@/assets/images/bankList/doku_bni.png');
        break;
      default:
        bankObj = {};
    }
    return bankObj;
  }
}