const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
var page = 1;
var page_size = 10;
var dataType = 1;
var dataId = 0;
Page({
  data: {
    movies: {},
    hidden: 0,
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    dataId = options.id;
    var type = options.type;
    if (type == 1) {
      dataType = 1;
      wx.setNavigationBarTitle({
        title: '电影类型'
      })
    } else {
      dataType = 2;
      wx.setNavigationBarTitle({
        title: '热门标签'
      })
    }
    //console.info(encodeURIComponent('{"data_type": ' + dataType + ',"data_id": ' + id + ',"page":0,"page_size":10}'))
    var listParam = {
      "apiid": "we_app_movie_list",
      "params": encodeURIComponent('{"data_type": ' + dataType + ',"data_id": ' + dataId + ',"page":0,"page_size":10}')
    }
    this.loadData(POST_URL, listParam)
  },
  onReady: function () {
    wx.hideNavigationBarLoading();
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
        //console.info(res)
        if (res.data.status == 1) {
          var data = decodeURIComponent(res.data.content);
          //console.info(data)
          var jsonData = JSON.parse(data);
          //console.info(jsonData)
          that.setData({
            movies: jsonData.movie_list,
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
  loadMore: function (that) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.setData({
      hidden: 1
    });
    wx.request({
      url: POST_URL,
      method: 'POST',
      data: {
        "apiid": "we_app_movie_list",
        "params": encodeURIComponent('{"data_type": ' + dataType + ',"data_id": ' + dataId + ',"page":' + page + ',"page_size":' + page_size + '}')
      },
      success: function (res) {
        var data = decodeURIComponent(decodeURIComponent(res.data.content));
        var total = data.length;
        var page_total = Math.ceil(total / page_size);
        if (page < page_total) {
          that.setData({
            hidden: 1
          });
        } else {
          that.setData({
            hidden: 0
          });
        }
        var jsonData = JSON.parse(data);
        console.info(jsonData);
        var list = that.data.movies;
        for (var i = 0; i < jsonData.movie_list.length; i++) {
          list.push(jsonData.movie_list[i]);
        }
        that.setData({
          movies: list
        });
        page++;
        wx.hideNavigationBarLoading() //完成停止加载
      },
      fail: function (e) {
        console.log(e)
      }

    });
  },
  goDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    var that = this;
    this.loadMore(that);
  },
  onPullDownRefresh: function () {
    //下拉触发
    var movieList = {
      "apiid": "we_app_movie_list",
      "params": encodeURIComponent('{"data_type": ' + dataType + ',"data_id": ' + dataId + ',"page":0,"page_size":10}')
    }
    this.loadData(POST_URL, movieList);

  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    /*
    wx.redirectTo({
      url: 'index'
    })
     */
  }
})  