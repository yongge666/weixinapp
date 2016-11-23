//index.js
//获取应用实例
 //var app = getApp()
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
//获取轮播数据
Page({    
  data: {    
    movies:[    
    {imgurl:'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'} ,    
    {imgurl:'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'} ,    
    {imgurl:'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'} ,    
    {imgurl:'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'}     
    ]    
  },    
  onLoad: function () {    
  }    
})  