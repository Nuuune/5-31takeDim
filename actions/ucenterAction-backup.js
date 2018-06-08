/**
 * Copyright (C), 2017 InnoSolutions
 *
 * File Name: action-type.js
 * Author: InnoSolutions Team
 * Description: Constants Definition for Redux Action Type
 */

//action types
import {
  FETCH_LOGIN,
  ASYNC_STATUS,
  CART_LOAD_STORAGE,
  WX_CHECKSESSION_SUCCESS,
  WX_LOGIN_SUCCESS,
  SUBSCRIBE_LOGIN_CALLBACK,
  SUBSCRIBE_LOGIN_NEXT_URL,
  SUBSCRIBE_JWT_CALLBACK,
  UCENTER_TOGGLE_FOLLOW_USER
} from '../action-types'

//ajax request
import api from '../api/api'

//import util
import {isEmpty} from '../utils/util'

/**
 * Do Login Request Action
 */
const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Login Success Action
 *
 * @param result
 */
const fetchLoginSuccess = (result) => {
  console.log("fetchLoginSuccess" + result)

  return {
    type: FETCH_LOGIN,
    status: ASYNC_STATUS.SUCCESS,
    jwt: result
  }
}

/**
 * Login Failure Action
 */
const fetchLoginFailure = () => {
  // console.log("fetchLoginFailure")

  return {
    type: FETCH_LOGIN,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * Login Action
 */
export function fetchLogin(mobile, vcode, jwt) {
  // console.log("fetchLogin(mobile, vcode, jwt)")

  return dispatch => {
    dispatch(fetchLoginRequest())

    api.doSMSLogin({
      method: 'POST',
      data: {
        "mobile": mobile,
        "vcode": vcode,
        "wxLiteToken": jwt
      },
      success: (res) => {
        console.log("fetchLogin(success)")
        console.log(res)

        if (res.success) {
          dispatch(fetchLoginSuccess(res.data))
        } else {
          dispatch(fetchLoginFailure())
        }
      }
    });
  }
}

/**
 * Check Session
 *
 * 1. 检查Session
 * 2. 如果session有效，则从本地存储中获取jwt
 * 3. 根据jwt初始化app.globalData
 * 4. 如果session失效，则进行微信登录 // 由于微信目前已不支持wx.getUserInfo接口， 故现在不采取自动登陆
 */
const wxInitSession = (store) => {
  wx.checkSession({
    success: function () {
      try {
        let jwt = wx.getStorageSync("jwt");

        //if jwt exist and session is valid
        if (!isEmpty(jwt)) {
          store.dispatch({
            type: WX_CHECKSESSION_SUCCESS,
            jwt: jwt
          });
        }
        //else do wx login
        else {
          wxLogin(store);
        }
      } catch (e) {

      }
    },
    fail: function () {
      console.log("check session fail");

      wxLogin(store);
    }
  })

  try {
    //init shopping cart
    let contents = wx.getStorageSync("cart");

    if (!isEmpty(contents)) {
      store.dispatch({
        type: CART_LOAD_STORAGE,
        contents: contents
      });
    }
  } catch (e) {

  }
}


/**
 * 微信登录 -- 为bindGetUserInfo事件
 *
 * 1. 调用wx.login获取code
 * 2. 调用wx.getUserInfo获取用户信息
 * 3. 调用服务端wx-login方法，获取jwt
 * 4. 这些都应该是同步的，然后才能开始发起服务端的请求
 */
const wxLogin = (store) => {
  console.log(store);
  //do wxinlogin
  wx.login({
    success: function (res) {
      if (res.code) {
        let wxcode = res.code;

        // console.log("[wxLogin] wxcode:" + wxcode)

        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            // console.log("[wx.getUserInfo] success:" + JSON.stringify(res))
            serverWxLogin(store, wxcode, res.userInfo);
          },
          fail: function (res) {
            console.log("[wx.getUserInfo] fail:" + JSON.stringify(res))
            serverWxLogin(store, wxcode, null);
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg);
      }
    },
    fail: function () {
      console.log('获取用户登录态失败！');
    }
  });
}

/**
 * 服务器登录
 */
const serverWxLogin = (store, wxcode, userInfo) => {
  api.serverWxLogin({
    method: 'POST',
    data: {
      code: wxcode,
      nickName: (userInfo == null) ? "" : userInfo.nickName,
      avatarUrl: (userInfo == null) ? "" : userInfo.avatarUrl,
      gender: (userInfo == null) ? "" : userInfo.gender,
      province: (userInfo == null) ? "" : userInfo.province,
      city: (userInfo == null) ? "" : userInfo.city,
      country: (userInfo == null) ? "" : userInfo.country
    },
    header: {
      "source": "weapp",
      'Content-Type': 'application/json'
    },
    success: (res) => {
      // console.log("[serverWxLogin] success:" + JSON.stringify(res))
      try {
        const jwt = res.data;

        //存储jwt到本地存储
        wx.setStorageSync('jwt', jwt);

        store.dispatch({
          type: WX_LOGIN_SUCCESS,
          jwt: jwt
        });
      } catch (e) {

      }
    },
    fail: (res) => {
      console.log("服务器登录失败！")
    }
  });
}

/**
 * Do Login With CallBack
 */
const subscribeLoginCallback = (callback) => {
  return {
    type: SUBSCRIBE_LOGIN_CALLBACK,
    callback: callback
  }
}

/**
 * Do Login With CallBack
 */
const subscribeLoginNextUrl = (url) => {
  return {
    type: SUBSCRIBE_LOGIN_NEXT_URL,
    nextUrl: url
  }
}

/**
 * Do Login Request Action
 */
const toggleFollowUserRequest = (userId, subscribe) => {
  console.log("toggleFollowUserRequest:" + userId)
  return {
    type: UCENTER_TOGGLE_FOLLOW_USER,
    status: ASYNC_STATUS.LOADING,
    userId,
    subscribe
  }
}

/**
 * Login Success Action
 *
 * @param result
 */
const toggleFollowUserSuccess = (userId, subscribe, result) => {
  console.log("toggleFollowUserSuccess" + result)

  return {
    type: UCENTER_TOGGLE_FOLLOW_USER,
    status: ASYNC_STATUS.SUCCESS,
    userId,
    subscribe
  }
}

/**
 * Login Failure Action
 */
const toggleFollowUserFailure = (userId, subscribe) => {
  console.log("toggleFollowUserFailure")

  return {
    type: UCENTER_TOGGLE_FOLLOW_USER,
    status: ASYNC_STATUS.FAILURE
  }
}

/**
 * Do Login With CallBack
 */
const toggleFollowUser = (userId, subscribe) => {
  console.log("toggleFollowUser:" + userId);

  return dispatch => {
    dispatch(toggleFollowUserRequest(userId, subscribe))


    api.followUser({
      method: (subscribe == true) ? 'POST' : 'DELETE',
      data: {
        "userId": userId
      },
      success: (res) => {
        if (res.success) {
          dispatch(toggleFollowUserSuccess(userId, subscribe, res.data))
        } else {
          dispatch(toggleFollowUserFailure(userId, subscribe))
        }
      }
    });
  }
}


module.exports = {
  fetchLogin,
  wxInitSession,
  subscribeLoginCallback,
  subscribeLoginNextUrl,
  toggleFollowUser
}
