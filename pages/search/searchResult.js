//index.js
//获取应用实例
 //var app = getApp()
 var common = require('../../common/common.js')
Page({    
  data: {    
    movies:[    
    {imgurl:'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'} ,    
    {imgurl:'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'} ,    
    {imgurl:'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'} ,    
    {imgurl:'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'}     
    ]    
  },    
  onLoad: function (options) {   
    console.log(options.searchWords);
    //调用接口,获取数据
    var url ='';
    var data = [];
    //common.loadData(url,data);
    this.setData({
      searchWords: options.searchWords
    }) 
  }    
})  