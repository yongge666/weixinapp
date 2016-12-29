//index.js
 const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
//获取应用实例
 var app = getApp();
Page({    
  data: {    
    swiperImg:[
    {pic:"http://avatar.graphmovie.com/boo/adv2/1567/1567_20161226154556_.jpg",url:'../../pages/detail/detail'} ,    
    {pic:"http://avatar.graphmovie.com/boo/adv2/1564/1564_20161222183502_.jpg",url:'../../pages/detail/detail'} ,    
    {pic:'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg',url:'../../pages/detail/detail'} ,    
    {pic:"http://avatar.graphmovie.com/boo/adv2/584/584_20161223171655_.jpg",url:'../../pages/detail/detail'}          
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
  onShareAppMessage: function () {
    return {
      title: '图解电影',
      desc: '电影从未如此简单',
      path: 'pages/index/index'
    }
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
        //console.log(res.data.message);
        var data = decodeURIComponent(decodeURIComponent(res.data.content));
        console.log(data);
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        that.setData({
          swiperImg: jsonData.banner_list
        })

      }

    })
  },
  loadMore:function(event){
      var id = event.currentTarget.dataset.id;
      console.log(id)
      
  },
  goSearch:function(){
      wx.navigateTo({
        url: '../search/searchIndex',
        success: function(res){
          // success
        },
        complete: function() {
          // complete
        }
      })
  },
  goBannerDetail:function(options){
     var page =  options.currentTarget.dataset.page;
     var param = JSON.parse(decodeURIComponent(page));
      console.log(param);
      var a = param.a;
      console.log(a);
      if(a==2){
        //图解
        var mid = param.p.mid;
      }else if(a==3){
          //广告
          var aid = param.p.aid;
      }else if(a==4){
          //专题
          var tid = param.p.tid;
      }else if(a==11){
          //打开一个新的url,目前为排行榜
           wx.navigateTo({
           url: '../rank/rank',
         })
      }
      
  },
  goPlay:function(event){
      var id =  event.currentTarget.dataset.id;
      console.log(id)
       wx.navigateTo({
        url: '../play/play?id='+id,
        success: function(res){
          // success
        },
        complete: function() {
          // complete
        }
      })
  },
  onLoad: function () {
      //数据初始化
      var that = this;
      var wallImgLen = that.data.wallImg.length;
      that.setData({
        wallImgLen:wallImgLen
      });
      //1.获取轮播数据
      var swiperData = {
        "apiid": "we_app_index",
        "params": ""
      };
      this.loadData(POST_URL,swiperData);
  },
})  