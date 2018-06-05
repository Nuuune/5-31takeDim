//action types
import { COURSE_FETCH_LIST, ASYNC_STATUS, COURSE_CLEAR_ERRMSG } from "../action-types";

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
 * 清空错误信息
 */
export function clearErrMsg() {
 return {
   type: COURSE_CLEAR_ERRMSG
 }
}

/**
 * do
 */
export function fetchCourseData(option = {}) {
  console.log("fetchCourseData");
  return dispatch => {
    dispatch(fetchCourseRequest())
    setTimeout(()=>{
      api.getCourseData({
        success: (res) => {
          if (res.success == true) {
            dispatch(fetchCourseSuccess(res.data));
            option.success && option.success();
          } else {
            dispatch(fetchCourseFailure(res.msg));
            option.fail && option.fail();
          }
        },
        fail: (err) => {
          dispatch(fetchCourseFailure(err.errMsg));
          option.fail && option.fail();
        }
      })
    },2000)

  }
}

module.exports = {
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseFailure,
  fetchCourseData,
  clearErrMsg
}
