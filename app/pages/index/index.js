//index.js
const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
//获取应用实例
var app = getApp();
var page = 1;
var page_size = 10;
// 获取数据的方法
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: POST_URL,
    method: 'POST',
    data: {
      "apiid": "we_app_movie_chosen",
      "page": page,
      "page_size": page_size
    },
    success: function (res) {
      //console.info(that.data.list);
      var data = decodeURIComponent(decodeURIComponent(res.data.content));
      var jsonData = JSON.parse(data);
      var list = that.data.list;
      console.log(jsonData.movie_list.length);
      for (var i = 0; i < jsonData.movie_list.length; i++) {
        list.push(jsonData.movie_list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}
Page({
  data: {
    swiperImg: [
      { pic: "http://avatar.graphmovie.com/boo/adv2/1567/1567_20161226154556_.jpg", url: '../../pages/detail/detail' },
      { pic: "http://avatar.graphmovie.com/boo/adv2/1564/1564_20161222183502_.jpg", url: '../../pages/detail/detail' },
      { pic: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg', url: '../../pages/detail/detail' },
      { pic: "http://avatar.graphmovie.com/boo/adv2/584/584_20161223171655_.jpg", url: '../../pages/detail/detail' }
    ],
    wallImg: [{ "id": "10", "name": "恐怖", "pic": "http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png", "num": "0部" }, { "id": "2", "name": "喜剧", "pic": "http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_xiju@2x.png", "num": "0部" }, { "id": "4", "name": "爱情", "pic": "http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_aiqing@2x.png", "num": "0部" }, { "id": "13", "name": "悬疑", "pic": "http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_xuanyi-@2x.png", "num": "0部" }, { "id": "1", "name": "剧情", "pic": "http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_juqing@2x.png", "num": "0部" }, { "id": "16", "name": "科幻", "pic": "http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kehuan@2x.png", "num": "0部" }],
    hotTag: [{ "id": "5684", "name": "恐怖养成" }, { "id": "5690", "name": "热门首映" }, { "id": "5713", "name": "深度解读" }, { "id": "5816", "name": "撸片室" }, { "id": "5714", "name": "剧集精选" }, { "id": "5709", "name": "文艺几何" }, { "id": "5685", "name": "重口猎奇" }, { "id": "5712", "name": "开心麻花" }, { "id": "5711", "name": "暖心治愈" }, { "id": "5710", "name": "佳片有约" }, { "id": "5688", "name": "冷门小众" }, { "id": "5687", "name": "不可描述" }, { "id": "5105", "name": "LGBT" }, { "id": "5686", "name": "烧脑提神" }, { "id": "5689", "name": "豆瓣高分" }, { "id": "5691", "name": "烂片神解" }, { "id": "5692", "name": "世奇物语" }],
    list: [
      { "id": "11902", "name": "我不是潘金莲", "subtitle": "我叫李雪莲", "tag": "剧情|喜剧", "level": "0", "gm_score": "8.23", "db_score": "6.9", "stat_played": "33.5万", "stat_liked": "1108", "stat_commented": "79", "bpic": "http://avatar.graphmovie.com/boo/movies/11902/11902_20161229104953_b.jpg", "spic": "http://avatar.graphmovie.com/boo/movies/11902/11902_20161229104953_s.jpg", "author": { "id": "99MOJ96M", "name": "兔子木木桑", "avatar": "http://ser3.graphmovie.com/gmspanel/appimages/avatars/4370548/20160909173508.jpg!/fw/200/fh/200" } }
    ],
    hidden: true,
  },
  onShareAppMessage: function () {
    return {
      title: '图解电影',
      desc: '电影从未如此简单',
      path: 'pages/index/index'
    }
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
        //console.log(res.data.message);
        var data = decodeURIComponent(decodeURIComponent(res.data.content));
        console.log(data);
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        that.setData({
          swiperImg: jsonData.banner_list,
          wallImg: jsonData.genre_list,
          hotTag: jsonData.tag_hot_list,
        })

      }

    })
  },
  loadMovieData: function (url, data) {
    var that = this
    wx.request({
      method: 'POST',
      url: url,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var data = decodeURIComponent(decodeURIComponent(res.data.content));
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        that.setData({
          list: jsonData.movie_list
        })

      }

    })
  },
  loadMore: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)

  },
  goSearch: function () {
    wx.navigateTo({
      url: '../search/searchIndex',
      success: function (res) {
        // success
      },
      complete: function () {
        // complete
      }
    })
  },
  goBannerDetail: function (options) {
    var page = options.currentTarget.dataset.page;
    var param = JSON.parse(decodeURIComponent(page));
    console.log(param);
    var a = param.a;
    console.log(a);
    if (a == 2) {
      //图解
      var mid = param.p.mid;
    } else if (a == 3) {
      //广告
      var aid = param.p.aid;
    } else if (a == 4) {
      //专题
      var tid = param.p.tid;
    } else if (a == 11) {
      //打开一个新的url,目前为排行榜
      wx.navigateTo({
        url: '../rank/rank',
      })
    }

  },
  goPlay: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../play/play?id=' + id,
      success: function (res) {
        // success
      },
      complete: function () {
        // complete
      }
    })
  },
  goHotList: function (option) {
    var id = option.currentTarget.dataset.id;
  },
  goMovieType: function (option) {
    var id = option.currentTarget.dataset.id;
  },
  onLoad: function () {
    //数据初始化
    var that = this;
    var wallImgLen = that.data.wallImg.length;
    that.setData({
      wallImgLen: wallImgLen
    });
    //1.获取轮播数据
    var swiperData = {
      "apiid": "we_app_index",
      "params": ""
    };
    this.loadData(POST_URL, swiperData);
    var movieList = {
      "apiid": "we_app_movie_chosen",
      "page": "1",
      "page_size": "10"
    }
    this.loadMovieData(POST_URL, movieList);
    //   这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    /* var movieList = {
       "apiid":"we_app_movie_chosen",
       "page": "1",
       "page_size": "10"
     }
     this.loadMovieData(POST_URL,movieList);
     */
    wx.redirectTo({
      url: 'index'
    })
  }
})  