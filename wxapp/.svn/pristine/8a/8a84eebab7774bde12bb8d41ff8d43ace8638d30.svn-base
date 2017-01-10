//play.js
//获取应用实例
//var app = getApp()
const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
var page = 0;
var page_size = 10;
var movieId = '';
var data = {};
var title = '';
var img = '';
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
Page({
    data: {
        movie: {},
        hidden: true
    },
    onLoad: function (options) {
        //wx.clearStorage();
        movieId = options.id;
        title = options.title;
        img = options.image;
        wx.setNavigationBarTitle({
            title: '正在播放《' + title + '》'
        })
        wx.showNavigationBarLoading()
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
        //获取播放数据
        var mdata = {};
        data = wx.getStorageSync('movie_play_' + movieId);
        if (isEmptyObject(data)) {
            var movieData = {
                "apiid": "we_app_movie_script",
                "params": encodeURIComponent('{"movie_id": ' + movieId + '}')
            }
            //存缓存
            this.loadData(POST_URL, movieData, movieId);
        } else {
            //取取10条
            for (var value in data) {
                if (value <= 9) {
                    mdata[value] = data[value];
                }

            }
            that.setData({
                title: title,
                image: img,
                movie: mdata
            });
        }


    },
    onReady: function () {
        wx.hideNavigationBarLoading();
    },
    loadData: function (url, data, movieId) {
        var that = this
        wx.request({
            method: 'POST',
            url: url,
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.data.status == 1) {
                    var data = decodeURIComponent(res.data.content);
                    var jsonData = JSON.parse(data);
                    //存缓存
                    wx.setStorageSync('movie_play_' + movieId, jsonData.scripts);
                    data = jsonData.scripts;
                    //取取10条
                    var mdata = {};
                    for (var value in data) {
                        if (value <= 9) {
                            mdata[value] = data[value];
                        }

                    }
                    that.setData({
                        title: title,
                        image: img,
                        movie: mdata
                    });
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '数据走丢啦',
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
        wx.showNavigationBarLoading();
        var list = that.data.movie;
        if (isEmptyObject(data)) {
            var movieData = {
                "apiid": "we_app_movie_script",
                "params": encodeURIComponent('{"movie_id": ' + movieId + '}')
            }
            this.loadData(POST_URL, movieData, movieId);
            //从缓存获取数据
            if (isEmptyObject(data)) {
                data = wx.getStorageSync('movie_play_' + movieId);
            }

        }
        var start = page * page_size;
        var end = start + page_size;
        for (var i = start; i < end; i++) {
            list[i] = data[i];
        }
        that.setData({
            movie: list
        });
        page++;
        wx.hideNavigationBarLoading();
    },
    bindDownLoad: function () {
        //   该方法绑定了页面滑动到底部的事件
        var that = this;
        this.loadMore(that);
    },
    scroll: function (event) {
        //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop: event.detail.scrollTop
        });
    },
    refresh: function (event) {
        //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
        var that = this;
        page = 0;
        this.setData({
            list: [],
            scrollTop: 0
        });
        this.loadMore(that);
    }
})  