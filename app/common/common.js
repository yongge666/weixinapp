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
