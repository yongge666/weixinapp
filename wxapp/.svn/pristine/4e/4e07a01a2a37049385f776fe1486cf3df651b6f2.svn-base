//index.js
//获取应用实例
 var app = getApp();
 const POST_URL = 'https://auth.graphmovies.com/gmapi/weapp/interface';
Page({    
  data: {    
    detail:{
    imgurl:'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' ,    
    title:'瑞士军刀男' , 
    subTitle:'生命力在"丑陋"的东西里面',  
    desc:'一个小孩,相貌丑陋,说话口吃,而且因为疾病导致左脸局部麻痹,嘴角畸形,讲话时嘴巴总是歪向一边,还有一只耳朵失聪.为了纠正自己口吃,这孩子模仿古代一位有名的演说家,嘴里含着小石子讲话.看着嘴巴和舌头被舌头磨烂的儿子,母亲心疼的抱着他流泪说：“不要练了,妈妈一辈子陪着你.”他说：“妈妈,书上说,每一只漂亮的蝴蝶,都是冲破束缚自己的茧之后才变成的,我要做一只美丽的蝴蝶.”' , 
    director:'李一谋',
    actor:'李小龙/刘德华',
    type:'剧情/喜剧/精选',
    date:'2015-01-22',
    score:98,
    intro:'在组件中可以定义数据，这些数据将会通过事件传递给 SERVICE。 书写方式： 以data-开头，多个单词由连字符-链接，不能有大写(大写会自动转成小写)如data-element-type，最终在 event.target.dataset 中会将连字符转成驼峰elementType'

    }
  },    
  onLoad: function () {
          //1.获取排行榜数据
         var swiperData = {
           "apiid": "we_app_index",
           "params": "111",
           "ip": "192.168.1.19"
         };
         this.loadData(POST_URL, swiperData);
       
 
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
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        that.setData({
          detail: jsonData.banner_list
        })

      }

    })
  },
})  