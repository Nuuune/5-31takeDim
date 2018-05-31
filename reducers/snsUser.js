import { 
  SNS_FETCH_USER_INFO, 
  SNS_TOGGLE_DIGG_FEED,
  ASYNC_STATUS,
  LOADING_METHOD,
  UCENTER_TOGGLE_FOLLOW_USER 
} from '../action-types';

//SNS_HOME_PAGE_SIZE
import { SNS_HOME_PAGE_SIZE } from '../constants';

import { isEmpty } from '../utils/util';

/**
 * Initial State
 */
const initialState = {
  method: "load",
  userId: null,
  userData: null,
  feedCount: 0,
  pageNo: 0,
  hasMore: true
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  let feeds = null;
  let userData = null;

  switch (action.type) {
    //动态点赞
    //
    case SNS_TOGGLE_DIGG_FEED:
        
      //修改动态点赞状态
      if (!isEmpty(state.userData) && !isEmpty(state.userData.feeds) && (action.status == ASYNC_STATUS.SUCCESS)) {
        feeds = state.userData.feeds.map(item => {
          //修改点赞状态
          if (item.id == action.feedId) {
            item.digged = action.digged;
          }

          //设置点赞数量和用户列表
          if (action.digged === true) {
            item.diggCount += 1;
          } else {
            item.diggCount -= 1;
          }

          return item;
        });

        userData = state.userData;
        userData.feeds = feeds;

        return {
          ...state,
          userData
        };
      }

      break;


    //关注用户
    //
    case UCENTER_TOGGLE_FOLLOW_USER:
      //修改动态关注状态
      if (!isEmpty(state.feeds) && (action.status == ASYNC_STATUS.SUCCESS)) {
        feeds = state.userData.feeds.map(item => {
          if (item.userId == action.userId) {
            item.user.subscribe = action.subscribe;
          }

          return item;
        });

        userData = state.userData;
        userData.feeds = feeds;

        return {
          ...state,
          userData
        };
      }

      break;

    //用户详情
    //
    case SNS_FETCH_USER_INFO:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            method: action.method,
            pageNo: action.pageNo,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;

        case ASYNC_STATUS.SUCCESS:
          //加载更多
          if (state.method == LOADING_METHOD.LOADMORE) {
            userData = state.userData;
            userData.feeds = userData.feeds.concat(action.data.userData.feeds);

            return {
              ...state,
              fetchStatus: ASYNC_STATUS.SUCCESS,
              userData,
              hasMore: (SNS_HOME_PAGE_SIZE * (state.pageNo + 1)) < state.feedCount
            };
          } else {
            return {
              ...state,
              fetchStatus: ASYNC_STATUS.SUCCESS,
              userData: action.data.userData,
              feedCount: action.data.userData.feedCount,
              hasMore: (SNS_HOME_PAGE_SIZE * (state.pageNo + 1)) < action.data.userData.feedCount
            };
          }


          break;
          
        case ASYNC_STATUS.ERROR:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.ERROR
          };
          break;
        default:
          return state;
          break;
      }

      break;

    default:
      return state;
      break;
  }

  return state;
}
