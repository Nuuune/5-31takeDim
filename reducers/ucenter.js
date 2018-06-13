
import util from "../utils/util";
import constants from "../constants";

import { FETCH_LOGIN, ASYNC_STATUS, SET_USER_TOKEN,
NOT_NEW, IS_NEW, SET_USER_INFO, NOT_LOGIN, IS_LOGIN } from '../action-types';

/**
 * Initial State
 */
const initialState = {
  userId: null,
  nickname: "",
  tel: null,
  isLogin: false,
  token: null,
  isNew: false,
  errMsg: "",
  code: null,
  avatarUrl:constants.DEFAULT_AVATAR,
  city:null,
  country:null,
  gender:null,
  language:null,
  province:null,
};

/**
 * 用户中心 Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //用户登录
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
          return {
            ...state,
            nickname: action.data.nickname ? action.data.nickname : "",
            avatarUrl: action.data.avater ? action.data.avater : constants.DEFAULT_AVATAR,
            // userId: util.isEmpty(payload.sub) ? null : payload.sub,
            isLogin: true,
            status: ASYNC_STATUS.SUCCESS
          };
          break;
        //登录成功
        case ASYNC_STATUS.ERROR:

          return {
            ...state,
            status: ASYNC_STATUS.ERROR,
            errMsg: action.errMsg
          };
      }
    case SET_USER_TOKEN: {
      if(action.code) {
        return {
          ...state,
          code: action.code,
          token: action.token
        };
      } else {
        return {
          ...state,
          token: action.token
        };
      }
    }
    case SET_USER_INFO: {
      console.log(action.data);
      let {
        userId,
        nickName,
        tel,
        avatarUrl
      } = action.data;
      return {
        ...state,
        userId,
        nickname: nickName ? nickName : "",
        tel,
        avatarUrl: avatarUrl ? avatarUrl : constants.DEFAULT_AVATAR
      };
    }
    case IS_NEW: {
      return {
        ...state,
        isNew: true
      };
    }
    case NOT_NEW: {
      return {
        ...state,
        isNew: false
      };
    }
    case IS_LOGIN: {
      console.log('login');
      return {
        ...state,
        isLogin: true
      };
    }
    case NOT_LOGIN: {
      return {
        ...state,
        isLogin: false
      };
    }
    default:
      return state;
  }
}
