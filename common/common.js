/**
 * 数据获取
 */
  function loadData(url,data,type='GET'){
      var result =[];
        wx.request({
        url: url,
        data:data,
        method:type,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            result = res;
        },
        fail:function(res){
            result = res;
        }
    })

    return result;
  }
/**
 * 缓存设置
 */
function setStorge(key,value){
     return wx.setStorageSync(key, value);
}

/**
 * 缓存读取
 */
function getStroge(key){
     try {
        wx.getStorageSync(key);
        return 1;
    } catch (e) {
        return 0;
    }

}

/**
 * 删除缓存
 */
function removeStorge(key){
    try {
        wx.removeStorageSync(Key);
        return 1;
    } catch (e) {
        return 0;
    }
}

/**
 * 清空缓存
 */
function clearStorge(){
    try {
        wx.clearStorageSync();
        return 1;
    } catch (e) {
        return 0;
    }
}