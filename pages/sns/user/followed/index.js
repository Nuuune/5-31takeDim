/**
 * 关注列表页
 */

//api
import api from '../../../../api/api.js';

//redux connection
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置snsbase对象
import snsbase from '../../snsbase';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, snsbase, {
  /**
   * 
   */
  data: {
    users: null
  },

  /**
   * 
   */
  onLoad: function (options) {
    console.log("adfasdf")
    console.log(options)
    api.getUserFollowed({
      data: {
        userId: options.userId //1766
        // userId: 28
      },
      success: (res) => {
        this.setData({
          users: res.data
        });
      }
    })
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({

});

/**
 * Map Dispatch to Page
 */
const mapDispatchToPage = dispatch => ({
});

/**
 * Page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
