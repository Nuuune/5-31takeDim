/**
 * 
 */

//async status
import { ASYNC_STATUS } from "../../../action-types";

//reduct connect method, connect state and props
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

import catalogData from '../../../json/catalog/catalog.json.js';

// console.log(catalogData)

/**
 *
 */
const pageConfig = {
  /**
   * 
   */
  data: {
    homeData: catalogData,
    fetchStatus: null,
    showLoading: false,
    showError: false,
    swiperCurrent: 1,
    showRefresh: false
  },

  /**
   * onSwiperChange
   * 
   * @param e event object
   */
  onSwiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current + 1
    })
  },

  /**
   * onPullDownRefresh
   * 
   * @param e event object
   */
  onPullDownRefresh: function(e) {
    this.fetchHomeData("refresh");
  },

  /**
   * Page on Load
   */
  onLoad: function () {
    this.setData({
      homeData: catalogData.data,
      featured: catalogData.featured,
      topics: catalogData.topics,
      hots: catalogData.hots,
      authors: catalogData.authors,
      latest: catalogData.latest
    });
  }
};

/**
 * Page
 */
Page(pageConfig)