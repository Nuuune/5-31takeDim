//action types
import { SNS_FETCH_CHANNEL_LIST, SNS_CHANNEL_INFO_PREPEND_POSTED_FEED, SNS_FETCH_CHANNEL_INFO, ASYNC_STATUS } from "../action-types";

//api
import api from "../api/api"

/**
 * Fetech Home Request
 */
const fetchChannelListRequest = () => {
  console.log("fetchChannelListRequest")

  return {
    type: SNS_FETCH_CHANNEL_LIST,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
const fetchChannelListSuccess = (data) => {
  return {
    type: SNS_FETCH_CHANNEL_LIST,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
const fetchChannelListFailure = () => {
  return {
    type: SNS_FETCH_CHANNEL_LIST,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do 
 */
const fetchChannelListData = () => {
  return (dispatch) => {
    dispatch(fetchChannelListRequest())

    api.getChannelList({
      success: (res) => {
        dispatch(fetchChannelListSuccess({
          channels: res.data.data
        }));
      }
    });
  }
}



/**
 * Fetech Home Request
 */
const fetchChannelInfoRequest = () => {
  return {
    type: SNS_FETCH_CHANNEL_INFO,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
const fetchChannelInfoSuccess = (data) => {
  return {
    type: SNS_FETCH_CHANNEL_INFO,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
const fetchChannelInfoFailure = () => {
  return {
    type: SNS_FETCH_CHANNEL_INFO,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do 
 */
const fetchChannelInfoData = (channelId) => {
  return (dispatch) => {
    dispatch(fetchChannelInfoRequest())

    api.getChannelInfo({
      data: {
        channelId: channelId
      },
      success: (res) => {
        dispatch(fetchChannelInfoSuccess({
          channelInfo: res.data
        }));
      }
    });
  }
}

const channelInfoPrependPostedFeed = (feedData) => {
  return {
    type: SNS_CHANNEL_INFO_PREPEND_POSTED_FEED,
    feedData
  }
}

module.exports = {
  fetchChannelListData,
  fetchChannelInfoData,
  channelInfoPrependPostedFeed
}