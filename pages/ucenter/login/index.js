//index.js
//获取应用实例

Page({
  /**
   * 
   */
  data: {
  },

  /**
   * 
   */
  onWeppLogin: function(e) {
    wx.showModal({
      title: '请使用手机短信登录',
      content: '测试账号不支持微信登录，请使用手机号短信登录',
    })
  },
  /**
   * 
   */
  onLoad: function () {
    
  }
})
