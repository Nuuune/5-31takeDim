/**
 * Copyright (C), 2017 InnoSolutions
 * 
 * File Name: /pages/ucenter/index/index
 * 
 * Author: InnoSolutions Team
 * Description: 用户中心首页
 */

//import util
import util from '../../../utils/util.js';

//redux connect
import { connect } from '../../../libs/redux-weapp/wechat-weapp-redux.min';

//页面配置base对象
import base from '../../base';

/**
 * 页面配置对象
 */
const pageConfig = Object.assign({}, base, {
  /**
   * 点击进入购物车
   */
  onShoppingCartTap: function(e) {
    // this.authAction(function() {
    //   console.log("nav to cart")

    //   wx.navigateTo({
    //     url: '/pages/cart/index',
    //   })
    // });
  }
});

/**
 * Map Redux State to Page Data
 */
const mapStateToData = state => ({
  nickname: state.ucenter.nickname,
  avatar: state.ucenter.avatar,
  isLogin: state.ucenter.isLogin
});

/**
 * Map Redux Action to Page
 */
const mapDispatchToPage = dispatch => ({
});

/**
 * Map Dispatch to Page
 */
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);

/**
 * Page
 */
Page(nextPageConfig);