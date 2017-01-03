//play.js
//获取应用实例
 //var app = getApp()
var url = "http://www.imooc.com/course/ajaxlist";
var page =0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
// 获取数据的方法
var GetList = function(that){
    that.setData({
        hidden:false
    });
    wx.request({
        url:url,
        data:{
            page : page,
            page_size : page_size,
            sort : sort,
            is_easy : is_easy,
            lange_id : lange_id,
            pos_id : pos_id,
            unlearn : unlearn
        },
        success:function(res){
            //console.info(that.data.list);
            var list = that.data.list;
            for(var i = 0; i < res.data.list.length; i++){
                list.push(res.data.list[i]);
            }
            that.setData({
                list : list
            });
            page ++;
            that.setData({
                hidden:true
            });
        }
    });
}
Page({    
  data: {    
    detail:{
    imgurl:'http://7xi5ca.com2.z0.glb.qiniucdn.com/cd491d18eeb6d8922d9edeaf06502e7e' ,
    title:'瑞士军刀男' , 
    subTitle:'生命力在"丑陋"的东西里面',  
    desc:'一个小孩,相貌丑陋,说话口吃,而且因为疾病导致左脸局部麻痹,嘴角畸形,讲话时嘴巴总是歪向一边,还有一只耳朵失聪.为了纠正自己口吃,这孩子模仿古代一位有名的演说家,嘴里含着小石子讲话.看着嘴巴和舌头被舌头磨烂的儿子,母亲心疼的抱着他流泪说：“不要练了,妈妈一辈子陪着你.”他说：“妈妈,书上说,每一只漂亮的蝴蝶,都是冲破束缚自己的茧之后才变成的,我要做一只美丽的蝴蝶.”' , 
    director:'李一谋',
    actor:'李小龙/刘德华',
    type:'剧情/喜剧/精选',
    date:'2015-01-22',
    score:98,
    intro:'A 增加 上传代码时样式自动补全选项，默认开启，开发者可以主动关闭 详A 增加 开发环境不校验请求安全域名以及 TLS 版本选项，默认关闭，开发者可以主动开启 详情 增加 Page 页面脚本错误的提示信息A 增加 同客户的保持一致，校验 wx.request、wx.downloadFile、wx.uploadFile'

    }
  },    
  onLoad: function () {
      var that = this;
      wx.getSystemInfo({
          success:function(res){
              that.setData({
                  scrollHeight:res.windowHeight
              });
          }
      });
  },
  bindDownLoad:function(){
    //   该方法绑定了页面滑动到底部的事件
      var that = this;
      GetList(that);
  },
  scroll:function(event){
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  refresh:function(event){
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      page = 0;
      this.setData({
          list : [],
          scrollTop : 0
      });
      GetList(this)
  }
})  