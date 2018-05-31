/**
 * 用户首页
 */

//api
import api from '../../../../api/api.js';

//redux connection
import { connect } from '../../../../libs/redux-weapp/wechat-weapp-redux.min';

//异步加载状态
import { LOADING_METHOD, ASYNC_STATUS } from "../../../../action-types";

//redux actions
import { fetchUserInfoData } from '../../../../actions/snsUserAction';
import { toggleDiggFeed } from '../../../../actions/feedAction';
import { toggleFollowUser } from '../../../../actions/ucenterAction';

//页面配置base对象
import snsbase from '../../snsbase';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, snsbase, {
  
  /**
   * 
   */
  userId: null,

  /**
   * 
   */
  data: {
    userData: null,
    hasMore: true
  },

  /**
   * 点击进入关注列表
   */
  onFollowedTap: function(e) {
    wx.navigateTo({
      url: "/pages/sns/user/followed/index?userId=" + this.userId
    });
  },


  /**
   * 点击进入粉丝列表
   */
  onFollowerTap: function (e) {
    wx.navigateTo({
      url: "/pages/sns/user/follower/index?userId=" + this.userId
    });
  },

  /**
   * Pull down refresh
   */
  onPullDownRefresh: function (e) {
    this.fetchUserInfoData(this.userId, LOADING_METHOD.REFRESH);
  },

  /**
   * 上拉翻页
   * 
   * @param e event对象
   */
  onReachBottom: function(e) {
    //如果页面在加载中或者页面加载完，则不进行页面加载
    if (this.data.loadingStatus || (this.data.hasMore == false)) {
      return;
    }
    
    this.fetchUserInfoData(this.userId, LOADING_METHOD.LOADMORE, this.data.pageNo + 1);
  },

  /**
   * 加载页面，设置分享标题、图片和地址
   */
  onLoad: function (options) {
    this.userId = options.userId;

    this.fetchUserInfoData(options.userId);
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  loadMethod: state.snsUser.method,
  pageNo: state.snsUser.pageNo,
  hasMore: state.snsUser.hasMore,
  loadingStatus: state.snsUser.fetchStatus == ASYNC_STATUS.LOADING,
  userData: state.snsUser.userData
});

/**
 * Map Dispatch to Page
 */
const mapDispatchToPage = dispatch => ({
  fetchUserInfoData: (userId, method, pageNo) => dispatch(fetchUserInfoData(userId, method, pageNo)),
  toggleFollowUser: (userId, subscribe) => dispatch(toggleFollowUser(userId, subscribe)),
  toggleDiggFeed: (feedId, digg) => dispatch(toggleDiggFeed(feedId, digg))
});

/**
 * Page
 */
Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
