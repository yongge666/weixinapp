// pages/search/searchIndex.js
const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}
Page({
  data: {
    display: 'show',
    hotSearch: {}
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '图解搜索'
    })
    wx.showNavigationBarLoading();
    var that = this;
    var timestamp=new Date().getTime();
    var data = wx.getStorageSync('hot_search_tag');
    console.info(data);
    //缓存3天数据
    if (isEmptyObject(data) || timestamp-data.date>252900000) {
      var hotParam = {
        "apiid": "we_app_search_hot",
        "params": encodeURIComponent('{"page_size":5}')
      }
      this.loadData(POST_URL, hotParam);
    } else {
      that.setData({
        hotSearch: data.keywords
      })
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
        console.info(res);
        var data = decodeURIComponent(res.data.content);
        var jsonData = JSON.parse(data);
        console.log(jsonData)
        that.setData({
          hotSearch: jsonData.keywords
        })
         //存缓存
         var timestamp=new Date().getTime();
         wx.setStorageSync('hot_search_tag', {"keywords":jsonData.keywords,"date":timestamp});

      }

    })
  },
  getSearchWords: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  doSearch: function (e) {
    var searchWords = e.currentTarget.dataset.inputvalue;
    if (!searchWords) {
      return false;
    }
    console.info('doserrch'+searchWords)
    wx.navigateTo({
      url: '../search/searchResult?searchWords=' + searchWords,
    })
  },
  goSearch: function (options) {
    var keywords = options.currentTarget.dataset.text;
    if (!keywords) {
      return false;
    }
    console.info('goSearch'+keywords)
    wx.navigateTo({
      url: '../search/searchResult?searchWords=' + keywords,
    })
  },
  focus: function () {
    this.setData({
      display: 'hide'
    })
  },
  blur: function () {
    this.setData({
      display: 'show'
    })
  },
  goIndex: function () {
    wx.navigateBack();
  },
  onReady: function () {
    wx.hideNavigationBarLoading();
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})