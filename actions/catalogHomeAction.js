// fmt util
import {course_fmt} from "../utils/dataFormat";
//action types
import { CATALOG_FETCH_HOME, ASYNC_STATUS } from "../action-types";

//api
import api from "../api/api";

/**
 * Fetech Home Request
 */
const fetchHomeRequest = (method) => {
  return {
    type: CATALOG_FETCH_HOME,
    method,
    status: ASYNC_STATUS.LOADING
  }
}

/**
 * Fetech Home Success
 */
export function fetchHomeSuccess(data) {
  return {
    type: CATALOG_FETCH_HOME,
    status: ASYNC_STATUS.SUCCESS,
    data: data
  }
}

/**
 * Fetech Home Failure
 */
export function fetchHomeFailure() {
  return {
    type: CATALOG_FETCH_HOME,
    status: ASYNC_STATUS.ERROR
  }
}

function getHomeData(option) {
  let _op = option ? option : {};
  let p1 = new Promise((resolve, reject) => { api.getCourseData({
    success: (data) => {
      if(data.success) {
        resolve(course_fmt.list(data.data.slice(0,4)))
      } else {
        reject(data.msg)
      }
    }
  })});
  let p2 = new Promise((resolve, reject) => { api.getCourseData({
    success: (data) => {
      if(data.success) {
        resolve(course_fmt.list(data.data.slice(0,4)))
      } else {
        reject(data.msg)
      }
    }
  })});

  return Promise.all([p1,p2]).then(
    (values) => {
      _op.success && _op.success(values)
    }
  );
}

/**
 * fetchHomeData
 */
export function fetchHomeData(method) {
  return dispatch => {
    dispatch({
      type: CATALOG_FETCH_HOME,
      status: ASYNC_STATUS.LOADING,
      method: method
    });
    getHomeData({
      success: (values) => {
        dispatch({
          type: CATALOG_FETCH_HOME,
          status: ASYNC_STATUS.SUCCESS,
          data: {
            featured: values[0],
            latest: values[1]
          }
        })
        console.log(values);
      }
    })
  }
}

module.exports = {
  fetchHomeRequest,
  fetchHomeSuccess,
  fetchHomeFailure,
  fetchHomeData
}
