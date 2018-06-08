/**
 * Copyright (C), 2017 InnoSolutions
 *
 * File Name: action-type.js
 * Author: InnoSolutions Team
 * Description: Constants Definition for Redux Action Type
 */

//action types
import {FETCH_LOGIN, ASYNC_STATUS, NOT_NEW, IS_NEW, SET_USER_INFO, SET_USER_TOKEN} from '../action-types'

//ajax request
import api from '../api/api'

//import util
import {isEmpty} from '../utils/util'
import {Base64} from '../utils/util'

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
    data: result
  }
}

/**
 * Login Failure Action
 */
const fetchLoginFailure = (errMsg) => {
  // console.log("fetchLoginFailure")

  return {
    type: FETCH_LOGIN,
    status: ASYNC_STATUS.ERROR,
    errMsg: errMsg
  }
}

/**
 * Login Action
 */
 /**
  * Login Action
  */
 export function fetchLogin({mobile, vcode, token, vtoken}, option) {
   // console.log("fetchLogin(mobile, vcode, jwt)")
   let _op = option ? option : {};
   return dispatch => {
     dispatch(fetchLoginRequest())

     api.doSMSLogin({
       method: 'POST',
       data: {
         "mobile": mobile,
         "vcode": vcode,
         "token": vtoken,
         "wxLiteToken": token
       },
       success: (res) => {
         console.log("fetchLogin(success)")
         console.log(res)

         if (res.success) {
           dispatch(fetchLoginSuccess(res.data));
           dispatch({
             type: NOT_NEW
           });
           _op.success && _op.success();
         } else {
           dispatch(fetchLoginFailure(res.message))
           _op.fail && _op.fail();
         }
       }
     });
   }
 }

/**
 * 每次进入小程序需要初始化用户信息，判断是否时新用户
 * @return {[type]} [description]
 */
export function initUserInfo(store) {
  let {dispatch} = store;
  getWXCode(dispatch);
}

const getWXCode = (dispatch) => {
  wx.login({
    success: function(res) {
      if(res.code) {
        // 直接拿到wxcode
        let wxcode = res.code;
        // 进行服务端登陆
        serverLogin(wxcode, dispatch);

      } else {
        console.log(`获取code失败:${res.errMsg}`)
        getWXCode(dispatch)
      }
    },
    fail: function() {
      getWXCode(dispatch)
    }
  })
}

const serverLogin = (wxcode, dispatch) => {
  api.serverWxLogin({
    method: `POST`,
    data: {
      code: wxcode
    },
    success: function(res) {
      if(res.success) {
        let {user, token} = res.data;
        dispatch({
          type: SET_USER_TOKEN,
          token: token,
          code: wxcode
        });
        if(user){
          dispatch({type: NOT_NEW});
          dispatch({type: SET_USER_INFO, data: user})
        } else {
          dispatch({type: IS_NEW});
        }
      } else {
        // 没有成功重新登陆
        serverLogin(wxcode, dispatch);
      }
    },
    fail: function(err) {
      console.log(`失败: ${err}`)
      serverLogin(wxcode, dispatch);
    }
  })
}

/**
 * Check Session
 *
 * 1. 检查Session
 * 2. 如果session有效，则从本地存储中获取jwt
 * 3. 根据jwt初始化app.globalData
 * 4. 如果session失效，则进行微信登录 // 由于微信目前已不支持wx.getUserInfo接口， 故现在不采取自动登陆
 */
// const wxInitSession = (store) => {
//   wx.checkSession({
//     success: function () {
//       try {
//         let jwt = wx.getStorageSync("jwt");
//
//         //if jwt exist and session is valid
//         if (!isEmpty(jwt)) {
//           store.dispatch({
//             type: WX_CHECKSESSION_SUCCESS,
//             jwt: jwt
//           });
//         }
//         //else do wx login
//         else {
//           wxLogin(store);
//         }
//       } catch (e) {
//
//       }
//     },
//     fail: function () {
//       console.log("check session fail");
//
//       wxLogin(store);
//     }
//   })
//
//   try {
//     //init shopping cart
//     let contents = wx.getStorageSync("cart");
//
//     if (!isEmpty(contents)) {
//       store.dispatch({
//         type: CART_LOAD_STORAGE,
//         contents: contents
//       });
//     }
//   } catch (e) {
//
//   }
// }
//
//
// /**
//  * 微信登录 -- 为bindGetUserInfo事件
//  *
//  * 1. 调用wx.login获取code
//  * 2. 调用wx.getUserInfo获取用户信息
//  * 3. 调用服务端wx-login方法，获取jwt
//  * 4. 这些都应该是同步的，然后才能开始发起服务端的请求
//  */
// const wxLogin = (store) => {
//   console.log(store);
//   //do wxinlogin
//   wx.login({
//     success: function (res) {
//       if (res.code) {
//         let wxcode = res.code;
//
//         // console.log("[wxLogin] wxcode:" + wxcode)
//
//         //获取用户信息
//         wx.getUserInfo({
//           success: function (res) {
//             // console.log("[wx.getUserInfo] success:" + JSON.stringify(res))
//             serverWxLogin(store, wxcode, res.userInfo);
//           },
//           fail: function (res) {
//             console.log("[wx.getUserInfo] fail:" + JSON.stringify(res))
//             serverWxLogin(store, wxcode, null);
//           }
//         })
//       } else {
//         console.log('获取用户登录态失败！' + res.errMsg);
//       }
//     },
//     fail: function () {
//       console.log('获取用户登录态失败！');
//     }
//   });
// }

/**
 * 服务器登录
 */
// const serverWxLogin = (store, wxcode, userInfo) => {
//   api.serverWxLogin({
//     method: 'POST',
//     data: {
//       code: wxcode,
//       nickName: (userInfo == null) ? "" : userInfo.nickName,
//       avatarUrl: (userInfo == null) ? "" : userInfo.avatarUrl,
//       gender: (userInfo == null) ? "" : userInfo.gender,
//       province: (userInfo == null) ? "" : userInfo.province,
//       city: (userInfo == null) ? "" : userInfo.city,
//       country: (userInfo == null) ? "" : userInfo.country
//     },
//     header: {
//       "source": "weapp",
//       'Content-Type': 'application/json'
//     },
//     success: (res) => {
//       // console.log("[serverWxLogin] success:" + JSON.stringify(res))
//       try {
//         const jwt = res.data;
//
//         //存储jwt到本地存储
//         wx.setStorageSync('jwt', jwt);
//
//         store.dispatch({
//           type: WX_LOGIN_SUCCESS,
//           jwt: jwt
//         });
//       } catch (e) {
//
//       }
//     },
//     fail: (res) => {
//       console.log("服务器登录失败！")
//     }
//   });
// }

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
  initUserInfo,
  subscribeLoginCallback,
  subscribeLoginNextUrl,
  toggleFollowUser
}
