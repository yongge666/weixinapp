/*detail.js*/
//获取应用实例
 var app = getApp();
 const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
Page({    
  data: {    
    detail:{}
  },    
  onLoad: function (options) {
     wx.setNavigationBarTitle({
        title: '图解详情'
      })
    wx.showNavigationBarLoading();
    try{
      var movieId = options.id;
          //1.获取轮播详情页数据
      var movieDetail = {
        "apiid": "we_app_movie_info",
        "params": encodeURIComponent('{"movie_id":'+movieId+'}')
      };
         this.loadData(POST_URL, movieDetail);
    }catch(ex){
      wx.showModal({
        title: '温馨提示',
        content: '抱歉,页面走丢啦',
        //confirmText:'确定',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      })
    }
  },
   onReady:function(){
    wx.hideNavigationBarLoading();
  },
  goPlay:function(options){
    var id = options.currentTarget.dataset.id;
    var title = options.currentTarget.dataset.title;
    var image = options.currentTarget.dataset.image;
     wx.navigateTo({
      url: '../play/play?id='+id+'&title='+title+'&image='+image
    })
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
        var data = decodeURIComponent(res.data.content);
        var jsonData = JSON.parse(data);
        console.log(jsonData)
        that.setData({
          detail: jsonData
        })

      }

    })
  },
})  