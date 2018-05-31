import api from '../../../api/api.js'
import util from '../../../utils/util.js'


let pageConfig = {
  /**
   * 
   */
  data: {
    homeData: null,
    swiperCurrent: 1,
    hasRefesh: false
  },
  onSwiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current + 1
    })
  },

  onRefesh: function (e) {
    console.log(e)

    this.setData({
      hasRefesh: true
    });
  },

  /**
   * 
   */
  onLoad: function () {
    api.getEcHomeData({
      success: (res) => {
        if (res.success == true) {
          //console.log(res.data)

          this.setData({
            homeData: res.data
          })
        }
      }
    })
  }
};

Page({
  /**
   * 
   */
  data: {
    homeData: null,
    swiperCurrent: 1,
    hasRefesh: false
  },
  onSwiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current + 1
    })
  },
  
  onRefesh: function(e) {
    console.log(e)

    this.setData({
      hasRefesh: true
    });
  },

  /**
   * 
   */
  onLoad: function () {
    api.getEcHomeData({
      success: (res) => {
        if (res.success == true) {
          //console.log(res.data)
          
          this.setData({
            homeData: res.data
          })
        }
      }
    })
  }
})
