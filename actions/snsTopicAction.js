//action types
import { SNS_FETCH_TOPIC_LIST, SNS_FETCH_TOPIC, ASYNC_STATUS } from "../action-types";

//api
import api from "../api/api"

/**
 * Fetech Home Request
 */
const fetchTopicListRequest = () => {
  console.log("fetchTopicListRequest")

  return {
    type: SNS_FETCH_TOPIC_LIST,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
const fetchTopicListSuccess = (data) => {
  return {
    type: SNS_FETCH_TOPIC_LIST,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
const fetchTopicListFailure = () => {
  return {
    type: SNS_FETCH_TOPIC_LIST,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do 
 */
const fetchTopicListData = () => {
  return (dispatch) => {
    dispatch(fetchTopicListRequest())

    api.getTopicList({
      success: (res) => {
        dispatch(fetchTopicListSuccess({
          topics: res.data.data
        }));
      }
    });
  }
}



/**
 * Fetech Home Request
 */
const fetchTopicRequest = () => {
  console.log("fetchTopicRequest")

  return {
    type: SNS_FETCH_TOPIC,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
const fetchTopicSuccess = (data) => {
  return {
    type: SNS_FETCH_TOPIC,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
const fetchTopicFailure = () => {
  return {
    type: SNS_FETCH_TOPIC,
    status: ASYNC_STATUS.ERROR
  }
}

/**
 * do 
 */
const fetchTopicData = (topicId) => {
  return (dispatch) => {
    dispatch(fetchTopicRequest())

    api.getTopicData({
      data: {
        topicId: topicId
      },
      success: (res) => {
        console.log(res)
        dispatch(fetchTopicSuccess({
          topic: res.data
        }));
      }
    });
  }
}

module.exports = {
  fetchTopicListData,
  fetchTopicData
}