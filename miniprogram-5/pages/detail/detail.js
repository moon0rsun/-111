// pages/detail/detail.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({
  goToDetail: function(e){
    //获得携带的data-id
    let id=e.currentTarget.dataset.id;

    //携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    //获得页面跳转带来的数据
    let id = options.id

    //检查新闻是否文件夹内
    var article=wx.getStorageSync(id)
    //已存在
    if(article!=''){
      this.setData({
        article:article,
        isAdd:true
      })
    }
    else{
      let result = common.getNewsDetail(id)
    //获取行为内容
      if(result.code=='200'){
        this.setData({
          article:result.news,
          isAdd:false
        })
      }
    }
  },
//添加收藏夹
  addFavorites:function(options){
    let article=this.data.article;
    wx.setStorageSync(article.id,article);
    this.setData({isAdd:true});
  },

  //取消收藏
  cancelFavorites:function(){
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({isAdd:false});
  }
})