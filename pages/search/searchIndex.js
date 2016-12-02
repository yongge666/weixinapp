// pages/search/searchIndex.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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