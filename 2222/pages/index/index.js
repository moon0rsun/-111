Page({
  getWeather: function() {
    var that = this;
    // 第一步：获取 location ID
    wx.request({
      url: "https://geoapi.qweather.com/v2/city/lookup",
      data: {
        location: that.data.region[2],  
        key: '45625ad6a77c44c7a2d99977de9aef41'
      },
      success: function(res) {
        if (res.data && res.data.code === "200" && res.data.location.length > 0) {
          var locationId = res.data.location[0].id;  // 获取第一个结果的 location ID
          
          // 第二步：使用 location ID 获取天气信息
          wx.request({
            url: "https://devapi.qweather.com/v7/weather/now",
            data: {
              location: locationId,  // 使用获取到的 location ID
              key: '45625ad6a77c44c7a2d99977de9aef41'
            },
            success: function(res) {
              //console.log(res.data);  // 打印天气信息
              that.setData({now:res.data.now})
            }
          });
        } else {
          console.error("Location ID not found");
        }
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    region:['安徽省','芜湖市','镜湖区'],
    now:{
      temp:0,
      text:'未知',
      icon:'999',
      humidity:0,
      pressure:0,
      vis:0,
      windDir:0,
      windSpeed:0,
      windScale:0
    }
  },

  regionChange: function(e) {
    this.setData({region: e.detail.value});
    this.getWeather();
  },
  
  onLoad: function (options) {
    this.getWeather();
  },
})