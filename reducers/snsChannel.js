import { SNS_POST_FEED, SNS_FETCH_CHANNEL_LIST, SNS_FETCH_CHANNEL_INFO, ASYNC_STATUS } from '../action-types';

import {isEmpty} from '../utils/util';

/**
 * Initial State
 */
const initialState = {
  channelList: null,
  channelInfo: null
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  let feeds = null;
  let channelInfo = null;  

  switch (action.type) {
    //动态发布
    //
    case SNS_POST_FEED:
      if (!isEmpty(state.channelInfo) && !isEmpty(state.channelInfo.feeds) && (action.status == ASYNC_STATUS.SUCCESS)) {
        channelInfo = state.channelInfo;

        feeds = state.channelInfo.feeds;
        feeds.unshift(action.data);

        channelInfo.feeds = feeds;

        return {
          ...state,
          channelInfo
        };
      }

      break;
    //SNS_FETCH_CHANNEL_LIST
    case SNS_FETCH_CHANNEL_LIST:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;
        case ASYNC_STATUS.SUCCESS:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.SUCCESS,
            channelList: action.data.channels
          };
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

    //
    case SNS_FETCH_CHANNEL_INFO:
      switch (action.status) {
        case ASYNC_STATUS.LOADING:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.LOADING
          };
          break;
        case ASYNC_STATUS.SUCCESS:
          return {
            ...state,
            fetchStatus: ASYNC_STATUS.SUCCESS,
            channelInfo: action.data.channelInfo
          };
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
