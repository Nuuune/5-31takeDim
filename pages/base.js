/**
 * Base Page Configuration Object
 */

import _u from "../utils/util";
import _c from "../constants";


import { subscribeJwtCallback, subscribeLoginCallback, subscribeLoginNextUrl } from "../actions/ucenterAction";

/**
 * 页面配置父类
 */
module.exports = {
  /**
   * 在父类引入常量，以免每次在子类引入
   */
  CONF: _c,

  /**
   * 微信分享
   *
   * @e event
   */
  onShareAppMessage: function (e) {
    let title = !_u.isEmpty(this.SHARE_TITLE) ? this.SHARE_TITLE : _c.s.CATALOG_HOME_TITLE;
    let path = !_u.isEmpty(this.SHARE_PATH) ? this.SHARE_PATH : _c.u.CATALOG_HOME_URL;
    let imageUrl = !_u.isEmpty(this.SHARE_IMAGE_URL) ? this.SHARE_IMAGE_URL : null;

    return {
      title: title,
      path: path,
      imageUrl,
      success: function (res) {
      },
      fail: function (res) {
      }
    };
  },

  requireJwt: function(callback) {
    let jwt = getApp().store.getState().ucenter.jwt;

    if (_u.isEmpty(jwt)) {
      callback();
    } else {
      dispatch(subscribeJwtCallback(callback));
    }
  },

  /**
   * 检查用户是否登录，如果已登录这执行回调，如果未登录
   */
  requireAuth: function(callback) {
    let isLogin = getApp().store.getState().ucenter.isLogin;
    let dispatch = getApp().store.dispatch;

    console.log("isLogin:" + isLogin)

    //if user is logged in
    //run callback
    //
    if (isLogin) {
      callback();

      console.log("logged");
    } else {
      dispatch(subscribeLoginCallback(callback));

      wx.navigateTo({
        url: '/pages/ucenter/login/index',
      });
    }
  },

  /**
   * 检查用户是否登录，如果已登录这执行回调，如果未登录
   */
  requireAuthUrl: function(url) {
    let isLogin = getApp().store.getState().ucenter.isLogin;
    let dispatch = getApp().store.dispatch;

    //if user is logged in
    //run callback
    //
    if (isLogin) {
      wx.redirectTo({ url: url });

      console.log("logged");
    } else {
      dispatch(subscribeLoginNextUrl(url));

      wx.redirectTo({
        url: '/pages/ucenter/login/index',
      });
    }
  },

  userIsNew: function() {
    let isNew = getApp().store.getState().ucenter.isNew;
    let url = _u.getPageUrl();
    if(isNew){
      console.log(url);
      wx.navigateTo({
        url: `/pages/ucenter/login2/index?url=/${url}`
      })
      return true;
    }else {
      return false;
    }
  }
}
