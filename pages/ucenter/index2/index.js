/**
 * Copyright (C), 2017 InnoSolutions
 *
 * File Name: /pages/ucenter/index2/index
 *
 * Author: InnoSolutions Team
 * Description: 用户中心首页
 */

//import util
import util from '../../../utils/util.js';
import { SET_USER_INFO } from "../../../action-types";

//redux connect
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../../base';


/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {

  data: {

  },
  toLogin: function() {
    let url = util.getPageUrl();
    wx.navigateTo({
      url: `/pages/ucenter/login2/index?url=/${url}`
    })
  },

  getUserInfo: function(e) {
    console.log(e);
    let {userInfo} = e.detail;
    if(userInfo) {
      console.log(`得到userInfo`)
      this.setUserInfo(userInfo)
    }

  },

  onLoad: function(){
    console.log(this.store.getState());
    console.log(this.data.isNew);
  }

});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  isLogin: state.ucenter.isLogin,
  avatarUrl: state.ucenter.avatarUrl,
  nickname: state.ucenter.nickname
});

/**
 * Map Redux Action to Page
 */
const mapDispatchToPage = dispatch => ({
  setUserInfo: (data) => dispatch({type: SET_USER_INFO, data: data})
});

/**
 * Map Dispatch to Page
 */
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);

/**
 * Page
 */
Page(nextPageConfig);
