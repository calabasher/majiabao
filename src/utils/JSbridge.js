export default {
    // 发送数据
    callHandler(name, data, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler(name, data, callback)
        })
    },
    // 接收数据
    registerHandler(name, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(name, function (data, responseCallback) {
                callback(data, responseCallback)
            })
        })
    }
}

//这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge(callback) {
    console.log("与安卓交互")
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(window.WebViewJavascriptBridge)
        }, false);
    }
}

//注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge(function (bridge) {
    //初始化
    bridge.init(function (message, responseCallback) {
        let data = {'android Loading': 'ok!'};
        responseCallback(data);
    })
})
