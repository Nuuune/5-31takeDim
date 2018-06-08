
import util from "../utils/util";
import base64 from "../utils/crypto/base64";
import constants from "../constants";

import { 
  FETCH_LOGIN, 
  ASYNC_STATUS, 
  WX_CHECKSESSION_SUCCESS, 
  WX_LOGIN_SUCCESS, 
  SUBSCRIBE_LOGIN_CALLBACK, 
  SUBSCRIBE_LOGIN_NEXT_URL,
  UCENTER_TOGGLE_FOLLOW_USER
} from '../action-types';

/**
 * Initial State
 */
const initialState = {
  jwt: null,
  userId: null,
  nickname: "",
  avatar: constants.DEFAULT_AVATAR,
  latitude: null,
  longitude: null,
  isLogin: false,
  loginSuccessUrl: null,
  loginSuccessCB: null
};

/**
 * 用户中心 Reducer
 */
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    //关注用户
    //
    case UCENTER_TOGGLE_FOLLOW_USER:

      break;
    
    //微信登录 & 微信check session
    //
    case WX_LOGIN_SUCCESS: 
    case WX_CHECKSESSION_SUCCESS:
      let jwt = action.jwt;
      let payload = JSON.parse(base64.decode(jwt.split('.')[1]).replace(/\0/g, ''));

      // console.log(action.type)
      // console.log(payload)
      // console.log(util.isEmpty(payload.sub) ? false : true)

      return {
        ...state,
        jwt: jwt,
        nickname: payload.nickname,
        avatar: util.isEmpty(payload.avatar) ? constants.DEFAULT_AVATAR : payload.avatar,
        userId: util.isEmpty(payload.sub) ? null : payload.sub,
        isLogin: util.isEmpty(payload.sub) ? false : true
      };
      break;

    //注册登录成功回调函数
    //
    case SUBSCRIBE_LOGIN_CALLBACK:
    
      return {
        ...state,
        loginSuccessCB: action.callback
      };
      break;

    //注册登录成功跳转页面
    //
    case SUBSCRIBE_LOGIN_NEXT_URL:
      return {
        ...state,
        loginSuccessUrl: action.nextUrl
      };
      break;

    //用户登录
    //
    case FETCH_LOGIN:
    
      switch (action.status) {
        //用户加载
        case ASYNC_STATUS.LOADING:

          return {
            ...state,
            status: ASYNC_STATUS.LOADING
          };
          break;
        //登录成功
        case ASYNC_STATUS.SUCCESS:
          let jwt = action.jwt;
          let payload = JSON.parse(base64.decode(jwt.split('.')[1]).replace(/\0/g, ''));

          //存储jwt到本地存储
          wx.setStorageSync('jwt', jwt);

          return {
            ...state,
            jwt: jwt,
            nickname: payload.nickname,
            avatar: payload.avatar,
            userId: util.isEmpty(payload.sub) ? null : payload.sub,
            isLogin: util.isEmpty(payload.sub) ? false : true
          };          
          break;
        //登录成功
        case ASYNC_STATUS.ERROR:

          return {
            ...state,
            status: ASYNC_STATUS.ERROR
          };
          break;
        default:
          
      }

      break;
    default:
      return state;
      break;
  }

  return state;
}
