//Redux actions
import {fetchHomeData} from '../../../actions/catalogHomeAction';
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
    this.fetchHomeData('refresh');
  },

  /**
   * Page on Load
   */
  onLoad: function () {
    this.fetchHomeData('load');
    this.setData({
      homeData: catalogData.data,
      topics: catalogData.topics,
      hots: catalogData.hots,
      authors: catalogData.authors
    });
  }
};

/**
 * Redux状态映射函数
 *
 * @param state redux state对象
 */
const mapStateToData = state => ({
  featured: state.catalogHome.homeData.featured,
  latest: state.catalogHome.homeData.featured
});

/**
 * Redux action分发映射射函数
 *
 * @param dispatch function
 */
const mapDispatchToPage = dispatch => ({
  fetchHomeData: () => dispatch(fetchHomeData())
});

/**
 * Page页面
 *
 * Redux connect state and action to page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
