const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
Page({
  data: {
    movies: [
      { imgurl: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { imgurl: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { imgurl: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { imgurl: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ]
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var type = options.type;
    if (type == 1) {
      var dataType = 1;
    } else {
      var dataType = 2;
    }
    //console.info(encodeURIComponent('{"data_type": ' + dataType + ',"data_id": ' + id + ',"page":0,"page_size":10}'))
    var listParam = {
      "apiid": "we_app_movie_list",
      "params": encodeURIComponent('{"data_type": ' + dataType + ',"data_id": ' + id + ',"page":0,"page_size":10}')
    }
    this.loadData(POST_URL, listParam)
  },
  loadData: function (url, data) {
    var that = this
    wx.request({
      method: 'POST',
      url: url,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.info(res)
        if (res.data.status == 1) {
          var data = decodeURIComponent(res.data.content);
          console.info(data)
          var jsonData = JSON.parse(data);
          //console.info(jsonData)
          that.setData({
            movies: jsonData.banner_list,
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '抱歉,数据走丢啦,请稍后再试',
            //confirmText:'确定',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
        }


      }

    })
  },
})  