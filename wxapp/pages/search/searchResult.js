const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
var page = 1;
var page_size = 10;
var keyWords = '';
var total = 0;
Page({
  data: {
    movies: {},
    total: 0,
    hidden: 0
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
    keyWords = options.searchWords;

    if (keyWords != 0 && !keyWords) {
      return false;
    }
    wx.setNavigationBarTitle({
      title: '"' + keyWords + '"的搜索结果'
    })
    //console.info(encodeURIComponent('{"keyword":"' + keyWords + '" ,"page":0,"page_size":10}'));
    var listParam = {
      "apiid": "we_app_search",
      "params": encodeURIComponent('{"keyword":"' + keyWords + '" ,"page":0,"page_size":10}')
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
        console.info(res)
        if (res.data.status == 1) {
          var data = decodeURIComponent(res.data.content);
          //console.info(data)
          var jsonData = JSON.parse(data);
          console.info(jsonData)
          that.setData({
            movies: jsonData.list,
            total: jsonData.total
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
    wx.request({
      url: POST_URL,
      method: 'POST',
      data: {
        "apiid": "we_app_search",
        "params": encodeURIComponent('{"keyword": "' + keyWords + '" ,"page":' + page + ',"page_size":' + page_size + '}')
      },
      success: function (res) {
        if (res.data.status == 1) {
          var data = decodeURIComponent(decodeURIComponent(res.data.content));
          var total1 = data.length;
          var page_total = Math.ceil(total1 / page_size);
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
          for (var i = 0; i < jsonData.list.length; i++) {
            list.push(jsonData.list[i]);
          }
          that.setData({
            movies: list
          });
          page++;
        }

        // that.setData({
        //   hidden: true
        // });
        wx.hideNavigationBarLoading() //完成停止加载
      },
      fail: function (e) {
        console.log(e)
      }

    });
  },
  goDetail: function (options) {
    var id = options.currentTarget.dataset.id;
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
      "params": encodeURIComponent('{"keyword": ' + keyWords + ' ,"page":0,"page_size":10}')
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