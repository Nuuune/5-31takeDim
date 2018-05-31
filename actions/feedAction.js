//action types
import { 
  SNS_FETCH_FEED, 
  SNS_POST_FEED_COMMENT, 
  SNS_ADD_FEED_IMAGES, 
  SNS_TOGGLE_DIGG_FEED, 
  SNS_POST_FEED,
  ASYNC_STATUS,
  LOADING_METHOD
} from "../action-types";

import constants from "../constants";

import util from "../utils/util";

import { fetchSNSHomeData, prependPostedFeed } from "./snsHomeAction";
import { channelInfoPrependPostedFeed } from "./snsChannelAction";

//api
import api from "../api/api"

/**
 *  动态详情请求获取中
 */
const fetchFeedRequest = () => {
  return {
    type: SNS_FETCH_FEED,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 *  动态详情获取成功
 * 
 * @param data 动态详情对象
 */
function fetchFeedSuccess(data) {
  return {
    type: SNS_FETCH_FEED,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  动态详情获取失败
 */
function fetchFeedFailure() {
  return {
    type: SNS_FETCH_FEED,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * 获取动态详情
 * 
 * @param 动态id
 */
function fetchFeedData(feedId) {
  return dispatch => {
    dispatch(fetchFeedRequest())

    api.getFeed({
      data: {
        feedId: feedId
      },
      success: (res) => {
          console.log(res)
        if (res.success == true) {
          dispatch(fetchFeedSuccess(res.data))
        } else {
          dispatch(fetchFeedFailure())
        }
      }
    })
  }
}

/**
 *  动态发布中
 */
const postFeedRequest = () => {
  return {
    type: SNS_POST_FEED,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 *  动态发布成功
 * 
 *  @param 发布成功返回参数
 */
function postFeedSuccess(data) {
  return {
    type: SNS_POST_FEED,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  动态发布失败
 */
function postFeedFailure() {
  return {
    type: SNS_POST_FEED,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * 动态发布
 * 
 * @param data内容
 */
function postFeedData(data) {
  return (dispatch, getState) => {
    dispatch(postFeedRequest())

    console.log("动态发布");
    console.log(data);

    api.postFeed({
      method: 'POST',
      data,
      success: (res) => {
        //服务端返回成功
        //
        if (res.success == true) {
          //动态发布成功
          dispatch(postFeedSuccess(res.data))

          console.log("频道id：" + data.channelId);

          //如果是社区动态则新增的动态社区
          //
          if (util.isEmpty(data.channelId)) {
            let state = getState();
            let stateSnsHome = state.snsHome;

            //如果社区首页是在推荐tab，则切换到关注页
            if (stateSnsHome.selectedTab == "SNS_TAB_RECOMMEND") {
              dispatch(fetchSNSHomeData(LOADING_METHOD.LOAD, constants.SNS_TAB_FOLLOWED));
            }
            //如果当前页就在页加入feed对象
            else {
              dispatch(prependPostedFeed(res.data));
            }
          } 
          //如果是频道里社区动态则新增的动态社区
          //
          else {
            channelInfoPrependPostedFeed(res.data);
          }
        } else {
          dispatch(postFeedFailure())
        }
      }
    })
  }
}

/**
 *  Request
 */
const postCommentRequest = (commentId, content) => {
  return {
    type: SNS_POST_FEED_COMMENT,
    status: ASYNC_STATUS.LOADING,
    reCommentId: commentId,
    commentContent: content
  }
}

/**
 *  Success
 */
function postCommentSuccess(data) {
  return {
    type: SNS_POST_FEED_COMMENT,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  Failure
 */
function postCommentFailure() {
  return {
    type: SNS_POST_FEED_COMMENT,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do
 */
function postFeedCommentData(feedId, commentId, content) {
  console.log(content)

  return dispatch => {
    dispatch(postCommentRequest(commentId, content))

    api.postComment({
      method: 'POST',
      data: {
        feedId, 
        commentId, 
        content
      },
      success: (res) => {
        console.log(res)

        if (res.success == true) {
          dispatch(postCommentSuccess(res.data))
        } else {
          dispatch(postCommentFailure())
        }
      }
    })
  }
}


const addFeedImages = (images) => {
  return {
    type: SNS_ADD_FEED_IMAGES,
    images
  }
}

/**
 *  Request
 */
const toggleDiggFeedRequest = (feedId, digged) => {
  console.log('toggleDiggFeedRequest:' + digged);

  return {
    type: SNS_TOGGLE_DIGG_FEED,
    status: ASYNC_STATUS.LOADING,
    feedId,
    digged
  }
}

/**
 *  Success
 */
function toggleDiggFeedSuccess(feedId, digged, data) {
  console.log('toggleDiggFeedSuccess:' + digged);

  return {
    type: SNS_TOGGLE_DIGG_FEED,
    status: ASYNC_STATUS.SUCCESS,
    feedId,
    digged,
    data: data
  }
}

/**
 *  Failure
 */
function toggleDiggFeedFailure(feedId, digged) {
  console.log('toggleDiggFeedFailure:' + digged);

  return {
    type: SNS_TOGGLE_DIGG_FEED,
    status: ASYNC_STATUS.ERROR,
    feedId,
    digged
  }
}

/**
 * do
 */
function toggleDiggFeed(feedId, digged) {
  return dispatch => {
    dispatch(toggleDiggFeedRequest(feedId, digged))

    api.toggleDiggFeed({
      method: (digged === true) ? "POST" : "DELETE",
      data: {
        feedId: feedId
      },
      success: (res) => {
        console.log(res)
        if (res.success == true) {
          dispatch(toggleDiggFeedSuccess(feedId, digged, res.data))
        } else {
          dispatch(toggleDiggFeedFailure(feedId, digged))
        }
      }
    })
  }
}

module.exports = {
  fetchFeedData,
  postFeedCommentData,
  addFeedImages,
  toggleDiggFeed,
  postFeedData
}