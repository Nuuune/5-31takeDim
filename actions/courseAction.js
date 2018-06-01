//action types
import { COURSE_FETCH_LIST, ASYNC_STATUS } from "../action-types";

//api
import api from "../api/api"

/**
 *  Request
 */
const fetchCourseRequest = () => {
  return {
    type: COURSE_FETCH_LIST,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 *  Success
 */
export function fetchCourseSuccess(data) {
  return {
    type: COURSE_FETCH_LIST,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 *  Failure
 */
export function fetchCourseFailure(errMsg) {
  return {
    type: COURSE_FETCH_LIST,
    status: ASYNC_STATUS.ERROR,
    errorMsg: errMsg
  }
}

/**
 * do
 */
export function fetchCourseData(productId) {
  console.log("fetchCourseData")
  return dispatch => {
    dispatch(fetchCourseRequest())
    setTimeout(()=>{
      api.getCourseData({
        success: (res) => {
          if (res.success == true) {
            dispatch(fetchCourseSuccess(res.data))
          } else {
            dispatch(fetchCourseFailure(res.msg))
          }
        }
      })
    },2000)

  }
}

module.exports = {
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseFailure,
  fetchCourseData
}
