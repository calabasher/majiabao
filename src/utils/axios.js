// promise封装 https://www.npmjs.com/package/axios
import Axios from 'axios'
import JSbridge from "./JSbridge";
import { Notify,Toast } from 'vant';

// 统一处理请求
Axios.defaults.baseURL = 'http://120.24.48.183:8098/feiblzapp' // 设置默认请求的url
Axios.defaults.timeout = 12000
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 根据method对数据进行整合，post请求时根据conten-type做数据格装换
  if (/^post$/i.test(config.method)) {
    // 后台接收的JSON格式的字符串 基本都是post
    config.params && (config.data = config.params)
    delete config.params
    let newContentType = config.headers['Content-Type']
    if (!newContentType || newContentType.indexOf('application/json') !== -1) {
      // 数据类型为'application/json'时，需要对数据进行转换
      config.data = JSON.stringify(config.data)
      console.log(config.data)
    }
  } else {
    config.data && (config.params = config.data)
    delete config.data
  }
  // 在请求中动态设置headers
  let url = config.url;
  let local = JSON.parse(localStorage.getItem('localToken'))
 
  // if(local){
  //   config.headers.common['app_version'] = local.versionName
  //   config.headers.common['appname'] = local.appname
  //   // config.headers.common['appcersioncode'] = local.appcersioncode
  //   config.headers.common['packagename'] = local.packagename
  //   config.headers.common['type'] = 'android'
  //   if (url.indexOf("cashloan/queryLoanAmount") > -1 || url.indexOf("applyCredit/submitApplyStart") || url.indexOf("bank/saveUserBank") || url.indexOf("cashloan/drawCashApplyTrans")) {
  //     config.headers.common['devicefinger'] = local.devicefinger
  //     config.headers.common['latitude'] = local.latitude
  //     config.headers.common['longitude'] = local.longitude
  //     config.headers.common['city'] = "unkown"
  //     config.headers.common['macaddress'] = local.macaddress
  //     config.headers.common['manufacturer'] = local.manufacturer
  //     config.headers.common['mobiletype'] = local.mobiletype
  //     config.headers.common['ip'] = local.ip
  //     config.headers.common['os'] = local.os
  //     config.headers.common['ossdk'] = local.ossdk
  //     config.headers.common['nettype'] = local.nettype
  //     config.headers.common['brand'] = local.brand
  //   }
  // }
  console.log("config.headers: " + JSON.stringify(config.headers))
  return config
}, function (error) {
  // 请求错误返回
  console.log(error)
  return Promise.reject(error)
})

Axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  console.log('请求状态码错误')
  return Promise.reject(error);
});

export default (reqObj, successCallback, errorCallback, failCallback) => {
  let LoadingToast;
  let defaultOpts = {
    method: 'GET',
    showLoading: true
  }
  if(defaultOpts.showLoading){
    // 爱的魔力转圈圈
    LoadingToast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
    });
  }
  Object.assign(defaultOpts, reqObj)
  Axios(defaultOpts).then((response) => {
    console.log('成功：'+JSON.stringify(response))
    LoadingToast.clear()
    if (parseInt(response.data.realData.code) === 10088 ) {
      Notify({ type: 'danger', message: 'Kedaluwarsa, Silakan masuk lagi' });
      localStorage.clear()
      JSbridge.callHandler('loginOut', 'ok', (data) => {
        console.log(data)
      })
    } else if (parseInt(response.data.realData.code) === 10086) {
      typeof successCallback === 'function' && successCallback(response.data)
    } else {
      Notify({ type: 'danger', message: response.data.realData.msg });
      typeof errorCallback === 'function' && errorCallback(response.data)
    }
  }).catch((response) => {
    console.log(response)
    LoadingToast.clear()
    if (typeof failCallback === 'function') {
      failCallback(response.data)
    } else {
      console.log('请求发生错误的接口：', JSON.stringify(reqObj.url), JSON.stringify(response.data))
      Notify({ type: 'danger', message: 'Kesalahan server terjadi, coba lagi nanti' });
      // Notify({ type: 'danger', message: '服务器发生错误，请稍后重试' });
    }
  })
}

/**
 * @param   {url:'/xxxx',method:'post',data:{}} reqObj
 *          reqObj特殊参数说明：
 *          url:              请求的地址，字符串
 *          method:           请求的方法，post或者get
 *          data:             请求的参数，对象
 *          loadingOptions    请求时加载特效的位置，target为id和class
 *          其余参数设置参考axios文档
 * @param  {function} successCallback    请求成功的回调函数
 * @param  {function} errorCallback      请求失败的回调函数
 * @param  {function} failCallback       请求错误的回调函数
 */