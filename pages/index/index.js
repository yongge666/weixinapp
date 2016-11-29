//index.js
//获取应用实例
 var app = getApp()
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     console.log(222)
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo
//       })
//     })
//   }
// })

//
Page({    
  data: {    
    swiperImg:[
    {imgurl:'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',url:'../../pages/detail/detail'} ,    
    {imgurl:'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg',url:'../../pages/detail/detail'} ,    
    {imgurl:'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg',url:'../../pages/detail/detail'} ,    
    {imgurl:'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg',url:'../../pages/detail/detail'}          
    ],
    wallImg:[
    {text:'恐怖',num:369,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,    
    {text:'喜剧',num:369,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_xiju@2x.png',url:'../../pages/swiper/swiper'} ,    
    {text:'爱情',num:369,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_aiqing@2x.png',url:'../../pages/swiper/swiper'} ,    
    {text:'悬疑',num:369,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_xuanyi-@2x.png',url:'../../pages/swiper/swiper'},
    {text:'剧情',num:369,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_juqing@2x.png',url:'../../pages/swiper/swiper'},
    {text:'科幻',num:369,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kehuan@2x.png',url:'../../pages/swiper/swiper'}        
    ],  
    list:[
    {title:'凯撒万岁',intro:'美式黑色幽默,看不懂不怪你',type:'喜剧|剧情|悬疑',username:'用户名',avatar:'http://imgs4.graphmovie.com/appimage/appavatar.jpg',look:200,like:100,comment:60,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,    
    {title:'凯撒万岁',intro:'美式黑色幽默,看不懂不怪你',type:'喜剧|剧情|悬疑',username:'用户名',avatar:'http://imgs4.graphmovie.com/appimage/appavatar.jpg',look:200,like:100,comment:60,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,   
    {title:'凯撒万岁',intro:'美式黑色幽默,看不懂不怪你',type:'喜剧|剧情|悬疑',username:'用户名',avatar:'http://imgs4.graphmovie.com/appimage/appavatar.jpg',look:200,like:100,comment:60,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,   
    {title:'凯撒万岁',intro:'美式黑色幽默,看不懂不怪你',type:'喜剧|剧情|悬疑',username:'用户名',avatar:'http://imgs4.graphmovie.com/appimage/appavatar.jpg',look:200,like:100,comment:60,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,
    {title:'凯撒万岁',intro:'美式黑色幽默,看不懂不怪你',type:'喜剧|剧情|悬疑',username:'用户名',avatar:'http://imgs4.graphmovie.com/appimage/appavatar.jpg',look:200,like:100,comment:60,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,
    {title:'凯撒万岁',intro:'美式黑色幽默,看不懂不怪你',type:'喜剧|剧情|悬疑',username:'用户名',avatar:'http://imgs4.graphmovie.com/appimage/appavatar.jpg',look:200,like:100,comment:60,imgurl:'http://ser3.graphmovie.com/appweb/weiapi/application/views/index/img/pic_kongbu@2x.temp-8715-crush.png',url:'../../pages/swiper/swiper'} ,     
    ]
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
  loadData:function(url,data){
        wx.request({
        url: url,
        data:data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log(res.data)
        }

    })
  },
  loadMore:function(event){
      var id = event.currentTarget.dataset.id;
      console.log(id)
  },
  onLoad: function () {
      //数据初始化
      var that = this;
      var wallImgLen = that.data.wallImg.length;
      that.setData({
        wallImgLen:wallImgLen
      });
      //1.获取轮播数据
      var swiperUrl = 'http://ser3.graphmovie.com/appweb/weiapi/index.php?c=Index&m=getSwiperImgUrl';
      var swiperData = {'id':1};
      this.loadData(swiperUrl,swiperData);

  },
})  