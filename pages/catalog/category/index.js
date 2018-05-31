//index.js
//获取应用实例
const app = getApp()

import api from '../../../api/api.js'
import util from '../../../utils/util.js'

import catalogData from '../../../json/catalog/catalog.json.js'

console.log(catalogData)

Page({
  /**
   * 
   */
  data: {
    subCategoriesViewWidth: parseInt(util.getWindowWidth() * 2 - 180),
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


  }
})
