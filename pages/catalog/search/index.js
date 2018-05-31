//index.js
//获取应用实例
const app = getApp()

import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  /**
   * 
   */
  data: {
    banners: [],
    events: [],
    
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 
   */
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 
   */
  onLoad: function () {
    api.getEcHomeData({
      success: (res) => {
        if (res.success == true) {
          let banners = res.data[1].data;
          let auctions = res.data[4].data;
          let articleTitle = res.data[5];
          let articles = [res.data[6], res.data[7], res.data[9], res.data[10], res.data[12], res.data[13]];
          
          this.setData({
            banners: banners,
            auctions: auctions,
            articleTitle: articleTitle,
            articles: articles
          })
        }
      }
    })
  }
})
