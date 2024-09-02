// pages/my/my.js
Page({
  getMyInfo:function(e){
    let info=e.detail.userInfo;
    this.setData({
      isLogin:true,
      src:info.avatarUrl,
      nickName:info.nickName
    })

    //获取收藏列表
    this.getMyFavorites();
  },

  getMyFavorites:function(){
    //获取收藏夹
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;

    let myList=[];
    for(var i = 0; i < num; i ++ ){
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }

    //更新收藏夹
    this.setData({
      newsList:myList,
      num:num
    });
  },

  onShow: function(){
    //如果已登录
    if(this.data.isLogin){
      //更新收藏列表
      this.getMyFavorites()
    }
  },

  goToDetail:function(e){
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻Id跳转
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
  }
})