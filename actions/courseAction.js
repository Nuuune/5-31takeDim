// fmt util
import {course_fmt} from "../utils/dataFormat"

//action types
import { COURSE_FETCH_LIST, ASYNC_STATUS, COURSE_CLEAR_ERRMSG, COURSE_CLEAR_LIST, COURSE_SET_COURSEDETAIL } from "../action-types";

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
 * 清空当前列表
 */
export function clearList() {
 return {
   type: COURSE_CLEAR_LIST
 }
}

/**
 * 设置课程详情
 */
export function setDetail(data) {
 return {
   type: COURSE_SET_COURSEDETAIL,
   courseDetail: data
 }
}


/**
 * do
 */
export function fetchCourseData(option = {}) {
  console.log("fetchCourseData");
  return dispatch => {
    dispatch(fetchCourseRequest())
    api.getCourseData({
      success: (res) => {
        if (res.success == true) {
          option.refresh && dispatch(clearList());
          dispatch(fetchCourseSuccess(course_fmt.list(res.data)));
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
  }
}

export function fetchCourseDetail(option = {}) {
  console.log(`fetchCourseDetail-${option.id}`);
  return dispatch => {
    dispatch(fetchCourseRequest())
    api.getCourseDetail({
      id: option.id,
      success: (res) => {
        if (res.success == true) {
          dispatch(setDetail(res.data));
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
  }
}


module.exports = {
  fetchCourseDetail,
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseFailure,
  fetchCourseData,
  clearErrMsg
}
