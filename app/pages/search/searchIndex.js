// pages/search/searchIndex.js
const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
Page({
  data:{
     display: 'show',
     hotSearch:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var hotParam = {
      "apiid": "we_app_search_hot",
      "params": encodeURIComponent('{"page_size":5}')
    }
    this.loadData(POST_URL,hotParam);
  },
  loadData:function(url,data){
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
          detail: jsonData
        })

      }

    })
  },
   getSearchWords:function(e){
     this.setData({
      inputValue: e.detail.value
    })
  },
  doSearch:function(e){
      var searchWords = e.currentTarget.dataset.inputvalue;
      if(searchWords.length==0){
        return false;
      }
      wx.navigateTo({
        url: '../search/searchResult?searchWords='+searchWords,
        success: function(res){
          // success
        },
        complete: function() {
          // complete
        }
      })
  },
  focus:function(){
    this.setData({
      display: 'hide'
    })
  },
  blur:function(){
    this.setData({
       display: 'show'
    })
  },
  goIndex:function(){
    wx.navigateBack();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})