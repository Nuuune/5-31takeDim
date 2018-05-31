/**
 * 关注列表页
 */

//api
import api from '../../../../api/api.js';

//redux connection
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../../../base';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {
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

    api.getUserFollower({
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
