//action types
import { 
  SNS_FETCH_HOME, 
  SNS_FETCH_FOLLOWED_FEEDS, 
  SNS_FETCH_FEEDS, 
  SNS_HOME_PREPEND_POSTED_FEED,
  ASYNC_STATUS
} from "../action-types";

//SNS_HOME_PAGE_SIZE
import { SNS_HOME_PAGE_SIZE, SNS_TAB_RECOMMEND, SNS_TAB_FOLLOWED} from '../constants';

//api
import api from "../api/api"

/**
 * Fetech Home Request
 */
const fetchSNSHomeRequest = (method, tab, pageNo) => {
  return {
    type: SNS_FETCH_HOME,
    method,
    tab,
    pageNo,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
export function fetchSNSHomeSuccess(data) {
  return {
    type: SNS_FETCH_HOME,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
export function fetchSNSHomeFailure() {
  return {
    type: SNS_FETCH_HOME,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do fetchSNSHomeData
 * 
 * @param method
 * @param tab
 * @param pNum
 */
export function fetchSNSHomeData(method, tab, pNum) {
  let pageNo = pNum || 0; 

  return (dispatch, getState) => {
    dispatch(fetchSNSHomeRequest(method, tab, pageNo))

    if (tab == SNS_TAB_RECOMMEND) {
      api.getSNSHome({
        data: {
          pageNo,
          pageSize: SNS_HOME_PAGE_SIZE
        },
        success: (res) => {
          dispatch(fetchSNSHomeSuccess({
            banners: res.data.banners,
            feeds: res.data.feeds,
            feedCount: res.data.feedCount
          }));
        }
      });
    } else if (tab == SNS_TAB_FOLLOWED) {
      api.getFollowedFeeds({
        data: {
          pageNo,
          pageSize: SNS_HOME_PAGE_SIZE
        },
        success: (res) => {
          dispatch(fetchSNSHomeSuccess({
            banners: res.data.banners,
            feeds: res.data.feeds,
            feedCount: res.data.feedCount
          }));
        }
      });
    }
  }
}

/**
 * Prepend Posted Feed
 */
export function prependPostedFeed(data) {
  return {
    type: SNS_HOME_PREPEND_POSTED_FEED,
    feedData: data
  }
}


module.exports = {
  fetchSNSHomeRequest,
  fetchSNSHomeSuccess,
  fetchSNSHomeFailure,
  fetchSNSHomeData,
  prependPostedFeed
}