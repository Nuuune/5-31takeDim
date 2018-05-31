//action types
import { CATALOG_FETCH_HOME, ASYNC_STATUS } from "../action-types";

//api
import api from "../api/api"

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

/**
 * fetchHomeData
 */
export function fetchHomeData(method) {
  return dispatch => {
    api.getEcHomeData({
      success: (res) => {
        if (res.success == true) {
          dispatch(fetchHomeSuccess(res.data))
        } else {
          dispatch(fetchHomeFailure())
        }
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